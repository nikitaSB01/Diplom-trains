export interface FiltersState {
    options: { [key: string]: boolean };
    price: [number, number] | null;

    // Туда
    thereDeparture: { from: number; to: number } | null;
    thereArrival: { from: number; to: number } | null;

    // Обратно
    backDeparture: { from: number; to: number } | null;
    backArrival: { from: number; to: number } | null;
}