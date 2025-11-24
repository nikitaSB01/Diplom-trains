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

const TYPES = [
    { id: "сидячий", label: "Сидячий", Icon: Sid, className: "fourth" },
    { id: "плацкарт", label: "Плацкарт", Icon: Plat, className: "third" },
    { id: "купе", label: "Купе", Icon: Cupe, className: "second" },
    { id: "люкс", label: "Люкс", Icon: Lux, className: "first" },
];

interface Props {
    onSelectType: (type: string) => void;
    routeId: string;
}

const TypeSelector: React.FC<Props> = ({ onSelectType, routeId }) => {
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

        fetch(`https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats`)
            .then((r) => r.json())
            .then((data: Carriage[]) => {
                setCarriages(data);
                setSelectedCars([]); // сброс выбранных вагонов
            });
    }, [activeType, routeId]);

    /* === При смене типа сразу открываем первый вагон === */
    useEffect(() => {
        if (filtered.length > 0) {
            setSelectedCars([filtered[0].coach._id]);
        }
    }, [filtered.length]);

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
                {TYPES.map(({ id, label, Icon }) => (
                    <button
                        key={id}
                        className={`${styles.typeItem} ${activeType === id ? styles.active : ""
                            }`}
                        onClick={() => {
                            setActiveType(id);
                            onSelectType(id);
                        }}
                        type="button"
                    >
                        <Icon className={styles.icon} />
                        <span className={styles.label}>{label}</span>
                    </button>
                ))}
            </div>

            {activeType && (
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