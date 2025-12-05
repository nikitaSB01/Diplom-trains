import { Train } from "./Train/trainTypes";

export interface PassengerFormData {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    documentType?: string;
    documentNumber?: string;
    ticketType?: "adult" | "child";
}

export interface Tickets {
    adults: number;
    kids: number;
    kidsNoSeat: number;
}

export interface SeatData {
    blockId: "first" | "second";
    type: string;
    wagonId: string;
    seats: { index: number; price: number }[];
    services: {
        wifi: boolean;
        linens: boolean;
        wifi_price: number;
        linens_price: number;
        total: number;
    };
}

export interface OrderSeatData {
    first: SeatData[];
    second: SeatData[];
}

export interface OrderTicketsData {
    first: Tickets;
    second: Tickets;
}

export interface OrderData {
    train: Train | null;
    tickets: OrderTicketsData;
    seats: OrderSeatData;
    types: {
        firstType: string | null;
        secondType: string | null;
    };
    filters: any; // позже заменим на FiltersState
}

export interface PassengersPageMainProps {
    orderData: OrderData;
    passengers: PassengerFormData[] | null;
    block1: any; // позже типизируем
    block2: any;
    totalPrice: number;
    from: any;
    to: any;
    dateStart: any;
    dateEnd: any;
}