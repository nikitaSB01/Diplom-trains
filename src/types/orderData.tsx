export interface OrderData {
    train: {
        departure: {
            min_price: number;
            duration: number;
            from: {
                datetime: number;
                city: { name: string };
                railway_station_name: string;
            };
            to: {
                datetime: number;
                city: { name: string };
                railway_station_name: string;
            };
            train: {
                name: string;
            };
        };
        arrival: any;
    };
    tickets: any;
    types: any;
    seats: any;
    filters: any;
}