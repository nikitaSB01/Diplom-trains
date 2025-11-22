
import React, { useEffect, useState } from "react";
import styles from "./Trains.module.css";

import { ReactComponent as ArrowThere } from "../../../assets/icons/Train/arrowThere.svg";
import { ReactComponent as ArrowBack } from "../../../assets/icons/Train/arrowBack.svg";
import { ReactComponent as Cup } from "../../../assets/icons/Train/cup.svg";
import { ReactComponent as Wifi } from "../../../assets/icons/Train/wifi.svg";
import { ReactComponent as Express } from "../../../assets/icons/Train/express.svg";
import { ReactComponent as Сonditioning } from "../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as Underwear } from "../../../assets/icons/Train/Underwear.svg";
import { ReactComponent as Ruble } from "../../../assets/icons/Train/ruble.svg";

import Pagination from "./Pagination/Pagination";
import TrainsTopFilter from "./TrainsTopFilter/TrainsTopFilter";

import {
  Train,
  DirectionInfo,
  WagonClass,
  TrainsProps,
} from "../../../types/Train/trainTypes";


// ======================================================
// Утилиты
// ======================================================

const formatDateForApi = (value?: string) => {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const [d, m, y] = value.split("/");
  if (!d || !m || !y) return "";

  return `${y.length === 2 ? "20" + y : y}-${m}-${d}`;
};

const formatDuration = (seconds?: number) => {
  if (!seconds) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}:${String(m).padStart(2, "0")}`;
};

const toMinutes = (unix: number) => {
  const date = new Date(unix * 1000);
  return date.getHours() * 60 + date.getMinutes();
};

const getSeats = (dir: DirectionInfo, cls: WagonClass) =>
  dir.available_seats_info?.[cls] ?? 0;

const getPrice = (dir: DirectionInfo, cls: WagonClass) =>
  dir.price_info?.[cls]?.bottom_price ??
  dir.price_info?.[cls]?.top_price ??
  dir.price_info?.[cls]?.side_price ??
  dir.min_price;


// ======================================================
// Компонент
// ======================================================

const Trains: React.FC<TrainsProps> = ({
  fromCity,
  toCity,
  dateStart,
  dateEnd,
  filters,
  onLoadingChange,
  onSelectTrain
}) => {

  // загрузка
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // сортировка / лимит
  const [sort, setSort] = useState<"date" | "price" | "duration">("date");
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState(1);

  // инкрементальная загрузка
  const [cache, setCache] = useState<Train[]>([]);
  const [serverOffset, setServerOffset] = useState(0);
  const serverLimit = 20;
  const [isEnd, setIsEnd] = useState(false);

  // hover состояния
  const [hover, setHover] = useState<{ index: number; cls: WagonClass } | null>(null);


  // ======================================================
  // 1. Загрузить 1-ю страницу при изменении города/даты/сортировки
  // ======================================================

  const loadServerPage = async (offset: number) => {
    const params = new URLSearchParams({
      from_city_id: fromCity!._id,
      to_city_id: toCity!._id,
      sort: sort,
      limit: String(serverLimit),
      offset: String(offset),
    });

    if (dateStart) params.append("date_start", formatDateForApi(dateStart));
    if (dateEnd) params.append("date_end", formatDateForApi(dateEnd));

    const response = await fetch(
      `https://students.netoservices.ru/fe-diplom/routes?${params.toString()}`
    );
    if (!response.ok) throw new Error("Ошибка загрузки");

    const data = await response.json();
    return data.items || [];
  };

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
        setError(e.message);
      } finally {
        setLoading(false);
        onLoadingChange?.(false);
      }
    };

    refresh();
  }, [fromCity, toCity, dateStart, dateEnd, sort]);



  // ======================================================
  // 2. Фильтрация
  // ======================================================

  const applyAllFilters = (t: Train) => {
    if (!filters) return true;

    if (filters.options) {
      const o = filters.options;
      if (o.coupe && !t.departure.have_second_class) return false;
      if (o.plaz && !t.departure.have_third_class) return false;
      if (o.seat && !t.departure.have_fourth_class) return false;
      if (o.lux && !t.departure.have_first_class) return false;
      if (o.wifi && !t.departure.have_wifi) return false;
      if (o.express && !t.departure.is_express) return false;
    }

    if (filters.price) {
      const [min, max] = filters.price;
      const price = t.departure.min_price;
      if (price < min || price > max) return false;
    }

    if (filters.thereDeparture) {
      const min = filters.thereDeparture.from * 60;
      const max = filters.thereDeparture.to * 60;
      const dep = toMinutes(t.departure.from.datetime);
      if (dep < min || dep > max) return false;
    }

    if (filters.thereArrival) {
      const min = filters.thereArrival.from * 60;
      const max = filters.thereArrival.to * 60;
      const arr = toMinutes(t.departure.to.datetime);
      if (arr < min || arr > max) return false;
    }

    if (filters.backDeparture && t.arrival) {
      const min = filters.backDeparture.from * 60;
      const max = filters.backDeparture.to * 60;
      const dep = toMinutes(t.arrival.from.datetime);
      if (dep < min || dep > max) return false;
    }

    if (filters.backArrival && t.arrival) {
      const min = filters.backArrival.from * 60;
      const max = filters.backArrival.to * 60;
      const arr = toMinutes(t.arrival.to.datetime);
      if (arr < min || arr > max) return false;
    }

    return true;
  };

  let filtered = cache.filter(applyAllFilters);



  // ======================================================
  // 3. Догрузка по необходимости
  // ======================================================

  const need = page * limit;

  const loadMoreIfNeeded = async () => {
    if (filtered.length >= need) return;
    if (isEnd) return;

    onLoadingChange?.(true);  // <<< ДОБАВИЛИ

    const next = serverOffset + serverLimit;

    try {
      const more = await loadServerPage(next);
      if (more.length === 0) {
        setIsEnd(true);
        onLoadingChange?.(false);   // <<< ДОБАВИЛИ
        return;
      }

      setCache(prev => [...prev, ...more]);
      setServerOffset(next);
    } catch {
      setIsEnd(true);
    } finally {
      onLoadingChange?.(false);  // <<< ДОБАВИЛИ
    }
  };

  useEffect(() => {
    loadMoreIfNeeded();
  }, [cache, filters, page, limit]);

  // ❗ Сбрасываем страницу при изменении фильтров
  useEffect(() => {
    setPage(1);
  }, [filters]);


  // ======================================================
  // 4. Пагинация
  // ======================================================

  const total = isEnd ? filtered.length : filtered.length + limit;
  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const end = start + limit;
  const pageItems = filtered.slice(start, end);


  // ======================================================
  // 5. Состояния загрузки
  // ======================================================

  if (loading) return <div className={styles.loading}>Загрузка…</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!filtered.length)
    return <div className={styles.empty}>Нет найденных маршрутов</div>;


  // ======================================================
  // 6. Рендер
  // ======================================================

  return (
    <div className={styles.trainsList}>

      <TrainsTopFilter
        total={filtered.length}
        sort={sort === "date" ? "времени" : sort === "price" ? "стоимости" : "длительности"}
        onSortChange={(value) => {
          if (value === "времени") setSort("date");
          if (value === "стоимости") setSort("price");
          if (value === "длительности") setSort("duration");
          setPage(1);
        }}
        limit={limit}
        onLimitChange={(value) => {
          setLimit(value);
          setPage(1);
        }}
      />

      {pageItems.map((train, index) => {
        const dep = train.departure;
        const arr = train.arrival;

        return (
          <div key={index} className={styles.trainCard}>

            {/* --- твоя разметка полностью сохранена --- */}

            <div className={styles.left}>
              <div className={styles.trainIcon}></div>
              <div className={styles.trainNumber}>{dep.train?.name}</div>

              {dep.from.city.name.toLowerCase() !== fromCity!.name.toLowerCase() && (
                <div className={styles.routeCityStart}>
                  {dep.from.city.name}
                  <span className={styles.routeArrowGray}></span>
                </div>
              )}

              <div className={styles.routeMain}>
                <div className={styles.routeLine}>
                  <span className={styles.routeCity}>{fromCity!.name}</span>
                  <span className={styles.routeArrowBlack}></span>
                </div>
                <div className={styles.routeCity}>{toCity!.name}</div>
              </div>
            </div>


            <div className={styles.center}>
              {/* Туда */}
              <div className={styles.directionBlock}>
                <div className={styles.direction}>

                  <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                    <p className={styles.time}>
                      {new Date(dep.from.datetime * 1000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className={styles.city}>{dep.from.city.name}</p>
                    <p className={styles.station}>{dep.from.railway_station_name} вокзал</p>
                  </div>

                  <div className={styles.arrowBlock}>
                    <p className={styles.duration}>{formatDuration(dep.duration)}</p>
                    <ArrowThere className={styles.arrowSvg} />
                  </div>

                  <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                    <p className={styles.time}>
                      {new Date(dep.to.datetime * 1000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className={styles.city}>{dep.to.city.name}</p>
                    <p className={styles.station}>{dep.to.railway_station_name} вокзал</p>
                  </div>

                </div>
              </div>


              {/* Обратно */}
              {arr && (
                <div className={styles.directionBlock}>
                  <div className={styles.direction}>

                    <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                      <p className={styles.time}>
                        {new Date(arr.to.datetime * 1000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className={styles.city}>{arr.to.city.name}</p>
                      <p className={styles.station}>{arr.to.railway_station_name} вокзал</p>
                    </div>

                    <div className={styles.arrowBlock}>
                      <p className={styles.duration}>{formatDuration(arr.duration)}</p>
                      <ArrowBack className={styles.arrowSvg} />
                    </div>

                    <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                      <p className={styles.time}>
                        {new Date(arr.from.datetime * 1000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className={styles.city}>{arr.from.city.name}</p>
                      <p className={styles.station}>{arr.from.railway_station_name} вокзал</p>
                    </div>

                  </div>
                </div>
              )}

            </div>


            {/* Правая колонка */}
            <div className={styles.right}>

              <div className={styles.priceList}>
                {dep.have_third_class && (
                  <div
                    className={styles.priceRow}
                    onMouseEnter={() => setHover({ index, cls: "third" })}
                    onMouseLeave={() => setHover(null)}
                  >
                    <span className={styles.priceLabel}>Плацкарт</span>
                    <span className={styles.priceSeats}>{getSeats(dep, "third")}</span>
                    <span className={styles.priceValue}>
                      <span className={styles.pricePrefix}>от</span>{" "}
                      <span className={styles.priceNumber}>
                        {getPrice(dep, "third")?.toLocaleString("ru-RU")}
                        <Ruble className={styles.rubleIcon} />
                      </span>
                    </span>
                  </div>
                )}

                {dep.have_second_class && (
                  <div
                    className={styles.priceRow}
                    onMouseEnter={() => setHover({ index, cls: "second" })}
                    onMouseLeave={() => setHover(null)}
                  >
                    <span className={styles.priceLabel}>Купе</span>
                    <span className={styles.priceSeats}>{getSeats(dep, "second")}</span>
                    <span className={styles.priceValue}>
                      <span className={styles.pricePrefix}>от</span>{" "}
                      <span className={styles.priceNumber}>
                        {getPrice(dep, "second")?.toLocaleString("ru-RU")}
                        <Ruble className={styles.rubleIcon} />
                      </span>
                    </span>
                  </div>
                )}

                {dep.have_first_class && (
                  <div
                    className={styles.priceRow}
                    onMouseEnter={() => setHover({ index, cls: "first" })}
                    onMouseLeave={() => setHover(null)}
                  >
                    <span className={styles.priceLabel}>Люкс</span>
                    <span className={styles.priceSeats}>{getSeats(dep, "first")}</span>
                    <span className={styles.priceValue}>
                      <span className={styles.pricePrefix}>от</span>{" "}
                      <span className={styles.priceNumber}>
                        {getPrice(dep, "first")?.toLocaleString("ru-RU")}
                        <Ruble className={styles.rubleIcon} />
                      </span>
                    </span>
                  </div>
                )}

                {dep.have_fourth_class && (
                  <div
                    className={styles.priceRow}
                    onMouseEnter={() => setHover({ index, cls: "fourth" })}
                    onMouseLeave={() => setHover(null)}
                  >
                    <span className={styles.priceLabel}>Сидячий</span>
                    <span className={styles.priceSeats}>{getSeats(dep, "fourth")}</span>
                    <span className={styles.priceValue}>
                      <span className={styles.pricePrefix}>от</span>{" "}
                      <span className={styles.priceNumber}>
                        {getPrice(dep, "fourth")?.toLocaleString("ru-RU")}
                        <Ruble className={styles.rubleIcon} />
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.services}>
                {dep.have_wifi && <Wifi className={styles.serviceIcon} />}
                {dep.is_express && <Express className={styles.serviceIcon} />}
                {dep.have_air_conditioning && <Сonditioning className={styles.serviceIcon} />}
                <Cup className={styles.serviceIcon} />
                <Underwear className={styles.serviceIcon} />
              </div>

              <button
                className={styles.button}
                onClick={() => onSelectTrain?.(train)}>
                Выбрать места
              </button>
            </div>
          </div>
        );
      })}

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => setPage(p)}
      />

    </div>
  );
};

export default Trains;
