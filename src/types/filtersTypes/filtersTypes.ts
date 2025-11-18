export interface FiltersState {
    options: { [key: string]: boolean };
    price: [number, number] | null;
    thereTime: { from: number; to: number } | null;
    backTime: { from: number; to: number } | null;
}