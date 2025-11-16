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
import Tooltip from "./Tooltip/Tooltip";

// Типы
import {
  Train,
  DirectionInfo,
  WagonClass,
  TrainsProps,
} from "../../../types/Train/trainTypes";

// ======================= Утилиты =======================

const formatDateForApi = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [day, month, year] = value.split("/");
  if (!day || !month || !year) return undefined;
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month}-${day}`;
};

const formatDuration = (seconds?: number) => {
  if (!seconds) return "";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

// безопасный доступ
const getSeats = (dir: DirectionInfo, cls: WagonClass) =>
  dir.available_seats_info?.[cls] ?? 0;

const getPrice = (dir: DirectionInfo, cls: WagonClass) =>
  dir.price_info?.[cls]?.bottom_price ??
  dir.price_info?.[cls]?.top_price ??
  dir.price_info?.[cls]?.side_price ??
  dir.min_price;

// ======================= Компонент =======================

const Trains: React.FC<TrainsProps> = ({ fromCity, toCity, dateStart, dateEnd }) => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Класс вагона, на который навели курсор (first, second, third, fourth)
  const [hover, setHover] = useState<{ index: number; cls: WagonClass } | null>(null);
  /* количество поездов на странице */
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  /* для пагинации */
  const limit = 5;
  const totalPages = Math.ceil(total / limit);

  // ======================= Загрузка поездов =======================

  useEffect(() => {
    if (!fromCity || !toCity) return;

    const fetchTrains = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          from_city_id: fromCity._id,
          to_city_id: toCity._id,
        });
        params.append("limit", limit.toString());
        params.append("offset", ((page - 1) * limit).toString());

        if (dateStart) {
          const apiDateStart = formatDateForApi(dateStart);
          if (apiDateStart) params.append("date_start", apiDateStart);
        }

        if (dateEnd) {
          const apiDateEnd = formatDateForApi(dateEnd);
          if (apiDateEnd) params.append("date_end", apiDateEnd);
        }

        const response = await fetch(
          `https://students.netoservices.ru/fe-diplom/routes?${params.toString()}`
        );

        if (!response.ok) throw new Error("Ошибка при загрузке данных");

        const data = await response.json();
        setTrains(data.items || []);
        setTotal(data.total_count || 0);
      } catch (err: any) {
        setError(err.message || "Не удалось загрузить поезда");
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, [fromCity, toCity, dateStart, dateEnd, page]);

  // ======================= Состояния загрузки =======================

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (trains.length === 0)
    return <div className={styles.empty}>Нет найденных маршрутов</div>;

  // ======================= TOOLTIP =======================

  const getTooltipInfo = (dir: DirectionInfo, cls: WagonClass) => {
    const price = dir.price_info?.[cls];
    const seats = dir.available_seats_info?.[cls];
    if (!price) return null;

    const info = [];

    if (price.top_price)
      info.push({ label: "верхние", price: price.top_price, count: seats });

    if (price.bottom_price)
      info.push({ label: "нижние", price: price.bottom_price, count: seats });

    if (price.side_price)
      info.push({ label: "боковые", price: price.side_price, count: seats });

    return info.length > 0 ? info : null;
  };

  // ======================= Рендер =======================

  return (
    <div className={styles.trainsList}>
      {trains.map((train, index) => {
        const dep = train.departure;
        const arr = train.arrival;

        return (
          <div key={index} className={styles.trainCard}>
            {/* Левая часть */}
            <div className={styles.left}>
              <div className={styles.trainIcon}></div>
              <div className={styles.trainNumber}>{dep?.train?.name || "Без названия"}</div>

              {dep?.from?.city?.name?.toLowerCase() !== fromCity?.name?.toLowerCase() && (
                <div className={styles.routeCityStart}>
                  {dep?.from?.city?.name}
                  <span className={styles.routeArrowGray}></span>
                </div>
              )}

              <div className={styles.routeMain}>
                <div className={styles.routeLine}>
                  <span className={styles.routeCity}>{fromCity?.name}</span>
                  <span className={styles.routeArrowBlack}></span>
                </div>
                <div className={styles.routeCity}>{toCity?.name}</div>
              </div>
            </div>

            {/* Центральный блок */}
            <div className={styles.center}>
              {/* Туда */}
              <div className={styles.directionBlock}>
                <div className={styles.direction}>
                  <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                    <p className={styles.time}>
                      {new Date(dep?.from?.datetime * 1000).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className={styles.city}>{dep?.from?.city?.name}</p>
                    <p className={styles.station}>{dep?.from?.railway_station_name}</p>
                  </div>

                  <div className={styles.arrowBlock}>
                    <p className={styles.duration}>{formatDuration(dep?.duration)}</p>
                    <ArrowThere className={styles.arrowSvg} />
                  </div>

                  <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                    <p className={styles.time}>
                      {new Date(dep?.to?.datetime * 1000).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className={styles.city}>{dep?.to?.city?.name}</p>
                    <p className={styles.station}>{dep?.to?.railway_station_name}</p>
                  </div>
                </div>
              </div>

              {/* Обратно */}
              {arr && (
                <div className={styles.directionBlock}>
                  <div className={styles.direction}>
                    <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                      <p className={styles.time}>
                        {arr?.to?.datetime
                          ? new Date(arr.to.datetime * 1000).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : "--:--"}
                      </p>
                      <p className={styles.city}>{arr?.to?.city?.name}</p>
                      <p className={styles.station}>{arr?.to?.railway_station_name}</p>
                    </div>

                    <div className={styles.arrowBlock}>
                      <p className={styles.duration}>{formatDuration(arr?.duration)}</p>
                      <ArrowBack className={styles.arrowSvg} />
                    </div>

                    <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                      <p className={styles.time}>
                        {arr?.from?.datetime
                          ? new Date(arr.from.datetime * 1000).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : "--:--"}
                      </p>
                      <p className={styles.city}>{arr?.from?.city?.name}</p>
                      <p className={styles.station}>{arr?.from?.railway_station_name}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Правая часть */}
            <div className={styles.right}>
              {/* Список типов мест */}
              <div className={styles.priceList}>
                {dep?.have_third_class && (
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
                      </span>{" "}
                    </span>
                    {/* TOOLTIP */}
                    {hover?.index === index &&
                      hover.cls === "third" &&
                      getTooltipInfo(dep, "third") && (
                        <Tooltip items={getTooltipInfo(dep, "third")!} />
                      )}
                  </div>
                )}

                {dep?.have_second_class && (
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
                      </span>{" "}
                    </span>
                    {/* TOOLTIP */}
                    {hover?.index === index &&
                      hover.cls === "second" &&
                      getTooltipInfo(dep, "second") && (
                        <Tooltip items={getTooltipInfo(dep, "second")!} />

                      )}
                  </div>
                )}

                {dep?.have_first_class && (
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
                      </span>{" "}
                    </span>
                    {/* TOOLTIP */}
                    {hover?.index === index &&
                      hover.cls === "first" &&
                      getTooltipInfo(dep, "first") && (
                        <Tooltip items={getTooltipInfo(dep, "first")!} />
                      )}
                  </div>
                )}

                {dep?.have_fourth_class && (
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
                      </span>{" "}
                    </span>
                    {/* TOOLTIP */}
                    {hover?.index === index &&
                      hover.cls === "fourth" &&
                      getTooltipInfo(dep, "fourth") && (
                        <Tooltip items={getTooltipInfo(dep, "fourth")!} />
                      )}
                  </div>
                )}
              </div>

              {/* Услуги */}
              <div className={styles.services}>
                {dep?.have_wifi && <Wifi className={styles.serviceIcon} />}
                {dep?.is_express && <Express className={styles.serviceIcon} />}
                {dep?.have_air_conditioning && <Сonditioning className={styles.serviceIcon} />}
                <Cup className={styles.serviceIcon} />
                <Underwear className={styles.serviceIcon} />
              </div>

              {/* Кнопка */}
              <button className={styles.button}>Выбрать места</button>
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