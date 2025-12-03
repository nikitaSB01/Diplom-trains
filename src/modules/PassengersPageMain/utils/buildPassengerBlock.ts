// ---------- типы ----------
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

export interface PassengerBlock {
    passengers: Tickets;
    adultsPrice: number;
    kidsPrice: number;
    servicesTotal: number;
    servicesList: { name: string; price: number }[];
    total: number;
}

// ---------- функция сборки данных по ОДНОМУ БЛОКУ (first / second) ----------
export const buildPassengerBlock = (
    tickets: Tickets,
    seatDataArr: SeatData[]
): PassengerBlock | null => {
    if (!seatDataArr || seatDataArr.length === 0) return null;

    const { adults, kids, kidsNoSeat } = tickets;

    const allSeatPrices: number[] = seatDataArr
        .flatMap((wagon) => wagon.seats.map((s) => s.price))
        .sort((a, b) => b - a);

    let adultsPrice = 0;
    let kidsPrice = 0;

    for (let i = 0; i < allSeatPrices.length; i++) {
        const price = allSeatPrices[i];

        if (i < adults) adultsPrice += price;
        else if (i < adults + kids) kidsPrice += price * 0.5;
    }

    // === СОБИРАЕМ ВСЕ ОТДЕЛЬНЫЕ УСЛУГИ ===
    const servicesList = seatDataArr.flatMap((wagon) => {
        const seatCount = wagon.seats.length;
        const out: { name: string; price: number }[] = [];

        // --- Wi-Fi: единоразово ---
        if (wagon.services.wifi) {
            out.push({
                name: "Wi-Fi",
                price: wagon.services.wifi_price,
            });
        }

        // --- Бельё: за каждое выбранное место ---
        if (wagon.services.linens) {
            out.push({
                name: `Бельё × ${seatCount}`,
                price: wagon.services.linens_price * seatCount,
            });
        }

        return out;
    });

    const servicesTotal = servicesList.reduce((s, x) => s + x.price, 0);

    return {
        passengers: { adults, kids, kidsNoSeat },
        adultsPrice,
        kidsPrice,
        servicesTotal,
        servicesList,
        total: adultsPrice + kidsPrice + servicesTotal,
    };
};