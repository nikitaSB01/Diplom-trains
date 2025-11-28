import React, { useState, useEffect } from "react";
import styles from "./TypeSelector.module.css";

import { ReactComponent as Cupe } from "../../../../assets/icons/ChoiceLocationTrains/cupe.svg";
import { ReactComponent as Plat } from "../../../../assets/icons/ChoiceLocationTrains/plat.svg";
import { ReactComponent as Lux } from "../../../../assets/icons/ChoiceLocationTrains/lux.svg";
import { ReactComponent as Sid } from "../../../../assets/icons/ChoiceLocationTrains/sid.svg";

import CarriageCard from "../../../../modules/ChoiceLocationTrains/CarriageCard/CarriageCard";

/* ===== Тип данных от API ===== */
interface Coach {
    _id: string;
    name: string;
    class_type: string;
    available_seats: number;

    top_price: number;
    bottom_price: number;
    side_price: number;

    have_wifi: boolean;
    have_air_conditioning: boolean;
    linens_price: number;
    is_linens_included: boolean;
    have_express?: boolean;
}

interface Carriage {
    coach: Coach;
    seats: { index: number; available: boolean }[];
}

interface Props {
    onSelectType: (type: string) => void;
    routeId: string;
    disabledType?: string | null;
    onUpdateSeats?: (data: {
        type: string;
        wagonId: string;
        seats: number[];
        services: {
            wifi: boolean;
            linens: boolean;
            wifi_price: number;
            linens_price: number;
        };
    }) => void;
}


const TYPES = [
    { id: "сидячий", label: "Сидячий", Icon: Sid, className: "fourth" },
    { id: "плацкарт", label: "Плацкарт", Icon: Plat, className: "third" },
    { id: "купе", label: "Купе", Icon: Cupe, className: "second" },
    { id: "люкс", label: "Люкс", Icon: Lux, className: "first" },
];

const TypeSelector: React.FC<Props> = ({ onSelectType, routeId, disabledType, onUpdateSeats }) => {

    /* для хорошей отрисовки данных по вагону */
    const [loading, setLoading] = useState(false);

    const [activeType, setActiveType] = useState<string | null>(null);

    const [carriages, setCarriages] = useState<Carriage[]>([]);
    const [selectedCars, setSelectedCars] = useState<string[]>([]);

    const typeInfo = TYPES.find((t) => t.id === activeType);

    // фильтруем вагончики по нужному классу
    const filtered = typeInfo
        ? carriages.filter(
            (c) => c.coach.class_type === typeInfo.className
        )
        : [];

    /* === Загружаем ВСЕ вагоны маршрута === */
    useEffect(() => {
        if (!activeType) return;

        setLoading(true);

        fetch(`https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats`)
            .then((r) => r.json())
            .then((data: Carriage[]) => {
                setCarriages(data);
            })
            .finally(() => setLoading(false));
    }, [activeType, routeId]);

    /* === При смене типа сразу открываем первый вагон === */
    useEffect(() => {
        if (filtered.length > 0 && selectedCars.length === 0) {
            setSelectedCars([filtered[0].coach._id]);   // открыть первый вагон
        }
    }, [filtered, selectedCars.length]);

    /* === Переключение вагона === */
    const toggleCar = (id: string) => {
        setSelectedCars((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id) // повторное — скрыть
                : [...prev, id] // добавить
        );
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Тип вагона</h2>

            <div className={styles.containerType}>
                {TYPES.map(({ id, label, Icon }) => {
                    const isDisabled = disabledType === id; // ← вот этого у тебя НЕ было

                    return (
                        <button
                            key={id}
                            disabled={isDisabled}
                            className={`
                ${styles.typeItem}
                ${activeType === id ? styles.active : ""}
                ${isDisabled ? styles.disabledType : ""}
            `}
                            onClick={() => {
                                if (isDisabled) return;       // ← не даём кликнуть
                                if (activeType === id) return;

                                setLoading(true);
                                setActiveType(id);
                                setSelectedCars([]);
                                onSelectType(id);
                            }}
                            type="button"
                        >
                            <Icon className={styles.icon} />
                            <span className={styles.label}>{label}</span>
                        </button>
                    );
                })}
            </div>

            {activeType && !loading && filtered.length > 0 && (
                <div className={styles.appearedBlock}>
                    <div className={styles.container}>
                        {/* === Кнопки вагонов === */}
                        {/* --- Блок "Вагоны" как в макете --- */}
                        <div className={styles.wagonsHeader}>
                            <div className={styles.left}>
                                <span className={styles.wagonsTitle}>Вагон</span>
                                <div className={styles.wagonButtons}>
                                    {filtered.map((car) => (
                                        <button
                                            key={car.coach._id}
                                            className={`${styles.wagonBtn} ${selectedCars.includes(car.coach._id)
                                                ? styles.activeWagon
                                                : ""
                                                }`}
                                            onClick={() => toggleCar(car.coach._id)}
                                        >
                                            {car.coach.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.right}>
                                Нумерация вагонов начинается с головы поезда
                            </div>
                        </div>

                        {/* === Выбранные вагоны === */}
                        {selectedCars.map((id) =>
                            filtered
                                .filter((c) => c.coach._id === id)
                                .map((c) => (
                                    <CarriageCard
                                        key={c.coach._id}
                                        carriage={c}
                                        onUpdateSeats={onUpdateSeats}
                                    />
                                ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypeSelector;