import React, { useEffect, useState } from "react";
import styles from "./FiltersLastTickets.module.css";

import { ReactComponent as WifiIcon } from "../../../assets/icons/Train/wifi.svg";
import { ReactComponent as ConditioningIcon } from "../../../assets/icons/Train/conditioning.svg";
import { ReactComponent as ExpressIcon } from "../../../assets/icons/Train/express.svg";
import { ReactComponent as Ruble } from "../../../assets/icons/Train/ruble.svg";

interface LastRoute {
  departure?: {
    from?: {
      city?: {
        name: string;
      };
      railway_station_name?: string;
    };
    to?: {
      city?: {
        name: string;
      };
      railway_station_name?: string;
    };
    min_price?: number;

    /* ДОП УСЛУГИ */
    have_wifi?: boolean;
    have_air_conditioning?: boolean;
    is_express?: boolean;
  };
}

const FiltersLastTickets: React.FC = () => {
  const [lastTickets, setLastTickets] = useState<LastRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLastTickets = async () => {
      try {
        const response = await fetch(
          "https://students.netoservices.ru/fe-diplom/routes/last"
        );
        const data = await response.json();

        const valid = data.filter((el: LastRoute) => {
          return (
            el?.departure?.from?.city?.name &&
            el?.departure?.to?.city?.name &&
            typeof el?.departure?.min_price === "number"
          );
        });

        setLastTickets(valid);
      } catch (e) {
        console.error("Ошибка загрузки последних билетов:", e);
      } finally {
        setLoading(false);
      }
    };

    loadLastTickets();
  }, []);

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Последние билеты</h3>

      {loading && <p className={styles.loading}>Загрузка...</p>}

      {!loading && lastTickets.length === 0 && (
        <p className={styles.empty}>Нет данных</p>
      )}

      <div className={styles.list}>
        {lastTickets.map((el, index) => {
          const from = el.departure?.from;
          const to = el.departure?.to;

          return (
            <div key={index} className={styles.card}>

              <div className={styles.top}>
                <div className={styles.left}>
                  <div className={styles.city}>{from?.city?.name}</div>
                  <div className={styles.stationLeft}>{from?.railway_station_name}</div></div>

                <div className={styles.right}>
                  <div className={styles.city}>{to?.city?.name}</div>
                  <div className={styles.stationRight}>{to?.railway_station_name}</div></div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.icons}>
                  {el.departure?.have_wifi && (
                    <WifiIcon className={styles.icon} />
                  )}
                  {el.departure?.is_express && (
                    <ExpressIcon className={styles.icon} />
                  )}
                  {el.departure?.have_air_conditioning && (
                    <ConditioningIcon className={styles.icon} />
                  )}
                </div>

                <div className={styles.priceBlock}>
                  <span className={styles.fromText}>от</span>
                  <span className={styles.price}>
                    {el.departure?.min_price?.toLocaleString("ru-RU")}
                    <Ruble className={styles.rubleIcon} />
                  </span>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiltersLastTickets;