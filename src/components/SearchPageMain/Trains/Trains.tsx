import React, { useEffect, useState } from "react";
import styles from "./Trains.module.css";
import { ReactComponent as ArrowThere } from "../../../assets/icons/Train/arrowThere.svg";
import { ReactComponent as ArrowBack } from "../../../assets/icons/Train/arrowBack.svg";

interface City {
  _id: string;
  name: string;
}

interface CityShort {
  _id: string;
  name: string;
}

interface PointInfo {
  railway_station_name: string;
  city: CityShort;
  datetime: number;
}

interface DirectionInfo {
  _id: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  duration: number;
  available_seats: number;
  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
  train: {
    _id: string;
    name: string;
  };
  from: PointInfo;
  to: PointInfo;
}

interface Train {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  available_seats: number;
  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
  departure: DirectionInfo;
  arrival: DirectionInfo;
}

interface TrainsProps {
  fromCity: City | null;
  toCity: City | null;
  dateStart: string;
  dateEnd?: string;
}

const formatDateForApi = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [day, month, year] = value.split("/");
  if (!day || !month || !year) return undefined;
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month}-${day}`;
};

const Trains: React.FC<TrainsProps> = ({ fromCity, toCity, dateStart, dateEnd }) => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!fromCity || !toCity || !dateStart) return;

    const fetchTrains = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          from_city_id: fromCity._id,
          to_city_id: toCity._id,
        });

        const apiDateStart = formatDateForApi(dateStart);
        const apiDateEnd = formatDateForApi(dateEnd);

        if (apiDateStart) params.append("date_start", apiDateStart);
        if (apiDateEnd) params.append("date_end", apiDateEnd);

        const response = await fetch(
          `https://students.netoservices.ru/fe-diplom/routes?${params.toString()}`
        );

        if (!response.ok) throw new Error("Ошибка при загрузке данных");

        const data = await response.json();
        setTrains(data.items || []);
      } catch (err: any) {
        setError(err.message || "Не удалось загрузить поезда");
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, [fromCity, toCity, dateStart, dateEnd]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (trains.length === 0)
    return <div className={styles.empty}>Нет найденных маршрутов</div>;

  return (
    <div className={styles.trainsList}>
      {trains.map((train, index) => {
        const dep = train.departure;
        const arr = train.arrival;

        const formatDuration = (seconds?: number) => {
          if (!seconds) return "";
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
        };

        return (
          <div key={index} className={styles.trainCard}>
            {/* Левая часть */}
            <div className={styles.left}>
              <div className={styles.trainIcon}></div>
              <div className={styles.trainNumber}>{dep?.train?.name || "Без названия"}</div>

              {/* если поезд начинается не из выбранного города */}
              {dep?.from?.city?.name?.toLowerCase() !== fromCity?.name?.toLowerCase() && (
                <div className={styles.routeCityStart}>
                  {dep?.from?.city?.name}
                  <span className={styles.routeArrowGray}></span>
                </div>
              )}

              {/* основной маршрут */}
              <div className={styles.routeMain}>
                <div className={styles.routeLine}>
                  <span className={styles.routeCity}>{fromCity?.name}</span>
                  <span className={styles.routeArrowBlack}></span>
                </div>
                <div className={styles.routeCity}>{toCity?.name}</div>
              </div>
            </div>

            {/* Центральная часть: "Туда" и "Обратно" */}
            {/* === Центральный блок (Туда и Обратно) === */}
            <div className={styles.center}>
              {/* ---- ТУДА ---- */}
              <div className={styles.directionBlock}>
                <div className={styles.direction}>
                  <div className={styles.timeBlock}>
                    <p className={styles.time}>{new Date(dep?.from?.datetime * 1000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</p>
                    <p className={styles.city}>{dep?.from?.city?.name}</p>
                    <p className={styles.station}>{dep?.from?.railway_station_name}</p>
                  </div>

                  <div className={styles.arrowBlock}>
                    <p className={styles.duration}>{formatDuration(dep?.duration)}</p>
                    <ArrowThere className={styles.arrowSvg} />
                  </div>

                  <div className={styles.timeBlock}>
                    <p className={styles.time}>{new Date(dep?.to?.datetime * 1000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</p>
                    <p className={styles.city}>{dep?.to?.city?.name}</p>
                    <p className={styles.station}>{dep?.to?.railway_station_name}</p>
                  </div>
                </div>
              </div>

              {/* ---- ОБРАТНО ---- */}
              <div className={styles.directionBlock}>
                <div className={styles.direction}>
                  <div className={`${styles.timeBlock} ${styles.leftBlock}`}>
                    <p className={styles.time}>{new Date(arr?.from?.datetime * 1000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</p>
                    <p className={styles.city}>{arr?.from?.city?.name}</p>
                    <p className={styles.station}>{arr?.from?.railway_station_name}</p>
                  </div>

                  <div className={styles.arrowBlock}>
                    <p className={styles.duration}>{formatDuration(arr?.duration)}</p>
                    <ArrowBack className={styles.arrowSvg} />
                  </div>

                  <div className={`${styles.timeBlock} ${styles.rightBlock}`}>
                    <p className={styles.time}>{new Date(arr?.to?.datetime * 1000).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}</p>
                    <p className={styles.city}>{arr?.to?.city?.name}</p>
                    <p className={styles.station}>{arr?.to?.railway_station_name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая часть */}
            <div className={styles.right}>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Купе</span>
                <span className={styles.priceSeats}>
                  {dep?.available_seats_info?.second || 0}
                </span>
                <span className={styles.priceValue}>от {dep?.min_price} ₽</span>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Люкс</span>
                <span className={styles.priceSeats}>
                  {arr?.available_seats_info?.first || 0}
                </span>
                <span className={styles.priceValue}>от {arr?.min_price} ₽</span>
              </div>
              <button className={styles.button}>Выбрать места</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Trains;