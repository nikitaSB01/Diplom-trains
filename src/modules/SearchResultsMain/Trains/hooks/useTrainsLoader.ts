import { useEffect, useState, useCallback } from "react";
import { Train } from "../../../../types/Train/trainTypes";
import { FiltersState } from "../../../../types/filtersTypes/filtersTypes";
import { applyFilters } from "../utils/applyFilters";

interface UseTrainsLoaderParams {
    fromCity: any;
    toCity: any;
    dateStart?: string;
    dateEnd?: string;
    filters?: FiltersState | null;
    onLoadingChange?: (loading: boolean) => void;
}

const formatDateForApi = (value?: string) => {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

    const [d, m, y] = value.split("/");
    if (!d || !m || !y) return "";

    return `${y.length === 2 ? "20" + y : y}-${m}-${d}`;
};

const SERVER_LIMIT = 20;

export const useTrainsLoader = ({
    fromCity,
    toCity,
    dateStart,
    dateEnd,
    filters,
    onLoadingChange,
}: UseTrainsLoaderParams) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [sort, setSort] = useState<"date" | "price" | "duration">("date");
    const [limit, setLimit] = useState<number>(5);
    const [page, setPage] = useState(1);

    const [cache, setCache] = useState<Train[]>([]);
    const [serverOffset, setServerOffset] = useState(0);
    const [isEnd, setIsEnd] = useState(false);

    const loadServerPage = useCallback(
        async (offset: number) => {
            const params = new URLSearchParams({
                from_city_id: fromCity!._id,
                to_city_id: toCity!._id,
                sort,
                limit: String(SERVER_LIMIT),
                offset: String(offset),
            });

            if (dateStart) params.append("date_start", formatDateForApi(dateStart));
            if (dateEnd) params.append("date_end", formatDateForApi(dateEnd));

            const response = await fetch(
                `https://students.netoservices.ru/fe-diplom/routes?${params.toString()}`
            );
            if (!response.ok) throw new Error("Ошибка загрузки");

            const data = await response.json();
            return (data.items || []) as Train[];
        },
        [fromCity, toCity, dateStart, dateEnd, sort]
    );

    // начальная загрузка / обновление при смене городов, дат, сортировки
    useEffect(() => {
        if (!fromCity || !toCity) return;

        const refresh = async () => {
            setLoading(true);
            onLoadingChange?.(true);
            setError("");
            setPage(1);
            setCache([]);
            setServerOffset(0);
            setIsEnd(false);

            try {
                const first = await loadServerPage(0);
                setCache(first);
            } catch (e: any) {
                setError(e.message || "Ошибка загрузки");
            } finally {
                setLoading(false);
                onLoadingChange?.(false);
            }
        };

        refresh();
    }, [fromCity, toCity, dateStart, dateEnd, sort, loadServerPage, onLoadingChange]);

    // фильтрация поверх кеша
    const filtered = applyFilters(cache, filters || undefined);
    const filteredCount = filtered.length;

    // сброс страницы при изменении фильтров
    useEffect(() => {
        setPage(1);
    }, [filters]);
    const need = page * limit;
    // догрузка по мере необходимости
    useEffect(() => {
        const loadMoreIfNeeded = async () => {
            if (filtered.length >= need) return;
            if (isEnd) return;
            onLoadingChange?.(true);
            const nextOffset = serverOffset + SERVER_LIMIT;
            try {
                const more = await loadServerPage(nextOffset);
                if (more.length === 0) {
                    setIsEnd(true);
                    onLoadingChange?.(false);
                    return;
                }
                setCache((prev) => [...prev, ...more]);
                setServerOffset(nextOffset);
            } catch {
                setIsEnd(true);
            } finally {
                onLoadingChange?.(false);
            }
        };

        loadMoreIfNeeded();
    }, [filtered.length, need, isEnd, serverOffset, loadServerPage, onLoadingChange]);
    // расчёт страниц
    const totalForPages = isEnd ? filteredCount : filteredCount + limit;
    const totalPages = Math.max(1, Math.ceil(totalForPages / limit));

    const start = (page - 1) * limit;
    const end = start + limit;
    const pageItems = filtered.slice(start, end);

    return {
        loading,
        error,
        sort,
        setSort,
        limit,
        setLimit,
        page,
        setPage,
        totalPages,
        pageItems,
        filteredCount,
    };
};