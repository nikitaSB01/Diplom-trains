import { useEffect, useState, useCallback, useMemo } from "react";
import { Train, DirectionInfo, WagonClass } from "../../../types/Train/trainTypes";
import { FiltersState } from "../../../types/filtersTypes/filtersTypes";

const formatDateForApi = (value?: string) => {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

    const [d, m, y] = value.split("/");
    if (!d || !m || !y) return "";
    return `${y.length === 2 ? "20" + y : y}-${m}-${d}`;
};

const toMinutes = (unix: number) => {
    const date = new Date(unix * 1000);
    return date.getHours() * 60 + date.getMinutes();
};

export const useTrainsLoader = ({
    fromCity,
    toCity,
    dateStart,
    dateEnd,
    filters,
    sort,
    limit,
    page,
}: {
    fromCity: any;
    toCity: any;
    dateStart?: string;
    dateEnd?: string;
    filters: FiltersState;
    sort: "date" | "price" | "duration";
    limit: number;
    page: number;
}) => {
    const [loading, setLoading] = useState(false);
    const [serverOffset, setServerOffset] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [error, setError] = useState("");
    const [cache, setCache] = useState<Train[]>([]);

    const SERVER_LIMIT = 20;

    // -----------------------------
    // ЗАГРУЗКА СЕРВЕРНОЙ СТРАНИЦЫ
    // -----------------------------
    const loadServerPage = useCallback(
        async (offset: number): Promise<Train[]> => {
            const params = new URLSearchParams({
                from_city_id: fromCity._id,
                to_city_id: toCity._id,
                sort,
                limit: String(SERVER_LIMIT),
                offset: String(offset),
            });

            if (dateStart) params.append("date_start", formatDateForApi(dateStart));
            if (dateEnd) params.append("date_end", formatDateForApi(dateEnd));

            const response = await fetch(
                `https://students.netoservices.ru/fe-diplom/routes?${params}`
            );

            if (!response.ok) throw new Error("Ошибка загрузки данных");

            const data = await response.json();
            return data.items ?? [];
        },
        [fromCity, toCity, sort, dateStart, dateEnd]
    );

    // -----------------------------
    // ПЕРВАЯ ЗАГРУЗКА
    // -----------------------------
    useEffect(() => {
        if (!fromCity || !toCity) return;

        let canceled = false;

        const load = async () => {
            setLoading(true);
            setError("");
            setIsEnd(false);
            setServerOffset(0);
            setCache([]);

            try {
                const res = await loadServerPage(0);
                if (!canceled) {
                    setCache(res);
                }
            } catch (e: any) {
                setError(e.message);
            } finally {
                if (!canceled) setLoading(false);
            }
        };

        load();
        return () => {
            canceled = true;
        };
    }, [fromCity, toCity, dateStart, dateEnd, sort]);

    // -----------------------------
    // ПРИМЕНЕНИЕ ФИЛЬТРОВ
    // -----------------------------
    const filtered = useMemo(() => {
        return cache.filter((t) => {
            if (!filters) return true;

            // ----- КЛАССЫ -----
            if (filters.options) {
                const o = filters.options;
                const d = t.departure;

                if (o.coupe && !d.have_second_class) return false;
                if (o.plaz && !d.have_third_class) return false;
                if (o.seat && !d.have_fourth_class) return false;
                if (o.lux && !d.have_first_class) return false;
                if (o.wifi && !d.have_wifi) return false;
                if (o.express && !d.is_express) return false;
            }

            // ------ ЦЕНА ------
            if (filters.price) {
                const [min, max] = filters.price;
                if (t.departure.min_price < min || t.departure.min_price > max) return false;
            }

            const dep = t.departure;
            const arr = t.arrival;

            // ------ ВРЕМЕНА ------
            if (filters.thereDeparture) {
                const min = filters.thereDeparture.from * 60;
                const max = filters.thereDeparture.to * 60;
                const val = toMinutes(dep.from.datetime);
                if (val < min || val > max) return false;
            }

            if (filters.thereArrival) {
                const min = filters.thereArrival.from * 60;
                const max = filters.thereArrival.to * 60;
                const val = toMinutes(dep.to.datetime);
                if (val < min || val > max) return false;
            }

            if (filters.backDeparture && arr) {
                const min = filters.backDeparture.from * 60;
                const max = filters.backDeparture.to * 60;
                const val = toMinutes(arr.from.datetime);
                if (val < min || val > max) return false;
            }

            if (filters.backArrival && arr) {
                const min = filters.backArrival.from * 60;
                const max = filters.backArrival.to * 60;
                const val = toMinutes(arr.to.datetime);
                if (val < min || val > max) return false;
            }

            return true;
        });
    }, [cache, filters]);

    // -----------------------------
    // ДОГРУЗКА ДАННЫХ
    // -----------------------------
    useEffect(() => {
        const need = page * limit;

        if (filtered.length >= need || isEnd) return;

        let canceled = false;

        const loadMore = async () => {
            try {
                const more = await loadServerPage(serverOffset + SERVER_LIMIT);
                if (more.length === 0) {
                    if (!canceled) setIsEnd(true);
                    return;
                }

                if (!canceled) {
                    setCache((prev) => [...prev, ...more]);
                    setServerOffset((prev) => prev + SERVER_LIMIT);
                }
            } catch {
                setIsEnd(true);
            }
        };

        loadMore();

        return () => {
            canceled = true;
        };
    }, [filtered.length, page, limit, isEnd, serverOffset, loadServerPage]);

    // -----------------------------
    // ПАГИНАЦИЯ
    // -----------------------------
    const total = isEnd ? filtered.length : filtered.length + limit;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const pageItems = filtered.slice(start, end);

    return {
        loading,
        error,
        filtered,
        pageItems,
        totalPages,
        isEnd,
    };
};