import React, { useEffect, useState } from "react";
import styles from "./Trains.module.css";

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
  price_info?: unknown;
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
  // Преобразуем 2025-03-01 → 2025-03-01 (если формат уже верный, возвращаем)
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

        return (
          <div key={index} className={styles.trainCard}>
            {/* Левая часть */}
            <div className={styles.left}>
              <div className={styles.trainNumber}>
                {dep?.train?.name || "Без названия"}
              </div>
              <div className={styles.route}>
                {dep?.from?.city?.name} → {dep?.to?.city?.name}
              </div>
            </div>

            {/* Средняя часть (время туда) */}
            <div className={styles.middle}>
              <div className={styles.timeBlock}>
                <p>
                  {new Date(dep?.from?.datetime * 1000).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <span>{dep?.from?.city?.name}</span>
                <span>{dep?.from?.railway_station_name}</span>
              </div>

              <div className={styles.arrow}>→</div>

              <div className={styles.timeBlock}>
                <p>
                  {new Date(dep?.to?.datetime * 1000).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <span>{dep?.to?.city?.name}</span>
                <span>{dep?.to?.railway_station_name}</span>
              </div>
            </div>

            {/* Правая часть */}
            <div className={styles.right}>
              <p>от {dep?.min_price || "-"} ₽</p>
              <button className={styles.button}>Выбрать места</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Trains;