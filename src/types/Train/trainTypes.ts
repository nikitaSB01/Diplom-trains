// ======================= Типы для структуры ответа от API =======================

/** Основные классы вагонов */
export type WagonClass = "first" | "second" | "third" | "fourth";

/** Информация о ценах в определённом классе */
export interface ClassPrice {
    top_price?: number; // верхняя цена
    bottom_price?: number; // нижняя цена
    side_price?: number; // боковое место
}

/** Краткая информация о городе */
export interface CityShort {
    _id: string;
    name: string;
}

/** Информация о точке отправления / прибытия */
export interface PointInfo {
    railway_station_name: string; // название вокзала
    city: CityShort; // объект города
    datetime: number; // время (в секундах)
}

/** Подробная информация о направлении (departure / arrival) */
export interface DirectionInfo {
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
    available_seats_info?: Partial<Record<WagonClass, number>>; // кол-во мест по типу
    price_info?: Partial<Record<WagonClass, ClassPrice>>; // цены по типу
    train: {
        _id: string;
        name: string;
    };
    from: PointInfo;
    to: PointInfo;
}

/** Полная информация о поезде (один элемент из массива items) */
export interface Train {
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    is_express: boolean;
    min_price: number;
    available_seats: number;
    available_seats_info?: Partial<Record<WagonClass, number>>;
    price_info?: Partial<Record<WagonClass, ClassPrice>>;
    departure: DirectionInfo; // направление туда
    arrival?: DirectionInfo; // направление обратно
}

/** Общий ответ от сервера */
export interface TrainResponse {
    total_count: number;
    items: Train[];
}

/** Данные о выбранных городах */
export interface City {
    _id: string;
    name: string;
}

/** Пропсы для компонента Trains */
export interface TrainsProps {
    fromCity: City | null;
    toCity: City | null;
    dateStart: string;
    dateEnd?: string;
}