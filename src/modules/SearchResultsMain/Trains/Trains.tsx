import React from "react";
import styles from "./Trains.module.css";

import Pagination from "./Pagination/Pagination";
import TrainsTopFilter from "./TrainsTopFilter/TrainsTopFilter";
import TrainRow from "../../../components/shared/TrainInfo/TrainRow/TrainRow";

import { TrainsProps } from "../../../types/Train/trainTypes";
import { useTrainsLoader } from "./hooks/useTrainsLoader";

const Trains: React.FC<TrainsProps> = ({
  fromCity,
  toCity,
  dateStart,
  dateEnd,
  filters,
  onLoadingChange,
  onSelectTrain,
}) => {
  const {
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
  } = useTrainsLoader({
    fromCity,
    toCity,
    dateStart,
    dateEnd,
    filters,
    onLoadingChange,
  });

  if (loading) return <div className={styles.loading}>Загрузка…</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!filteredCount)
    return <div className={styles.empty}>Нет найденных маршрутов</div>;

  return (
    <div className={styles.trainsList}>
      <TrainsTopFilter
        total={filteredCount}
        sort={
          sort === "date"
            ? "времени"
            : sort === "price"
              ? "стоимости"
              : "длительности"
        }
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

      {pageItems.map((train, index) => (
        <TrainRow
          key={index}
          train={train}
          fromCity={fromCity}
          toCity={toCity}
          onSelectTrain={onSelectTrain}
        />
      ))}

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default Trains;