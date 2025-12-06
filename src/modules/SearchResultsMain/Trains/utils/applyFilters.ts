import { Train } from "../../../../types/Train/trainTypes";
import { FiltersState } from "../../../../types/filtersTypes/filtersTypes";

const toMinutes = (unix: number) => {
    const date = new Date(unix * 1000);
    return date.getHours() * 60 + date.getMinutes();
};

export const applyFilters = (
    trains: Train[],
    filters?: FiltersState | null
): Train[] => {
    if (!filters) return trains;

    const applyOne = (t: Train) => {
        // --- опции ---
        if (filters.options) {
            const o = filters.options;
            if (o.coupe && !t.departure.have_second_class) return false;
            if (o.plaz && !t.departure.have_third_class) return false;
            if (o.seat && !t.departure.have_fourth_class) return false;
            if (o.lux && !t.departure.have_first_class) return false;
            if (o.wifi && !t.departure.have_wifi) return false;
            if (o.express && !t.departure.is_express) return false;
        }

        // --- цена ---
        if (filters.price) {
            const [min, max] = filters.price;
            const price = t.departure.min_price;
            if (price < min || price > max) return false;
        }

        // --- время ТУДА ---
        if (filters.thereDeparture) {
            const min = filters.thereDeparture.from * 60;
            const max = filters.thereDeparture.to * 60;
            const dep = toMinutes(t.departure.from.datetime);
            if (dep < min || dep > max) return false;
        }

        if (filters.thereArrival) {
            const min = filters.thereArrival.from * 60;
            const max = filters.thereArrival.to * 60;
            const arr = toMinutes(t.departure.to.datetime);
            if (arr < min || arr > max) return false;
        }

        // --- время ОБРАТНО ---
        if (filters.backDeparture && t.arrival) {
            const min = filters.backDeparture.from * 60;
            const max = filters.backDeparture.to * 60;
            const dep = toMinutes(t.arrival.from.datetime);
            if (dep < min || dep > max) return false;
        }

        if (filters.backArrival && t.arrival) {
            const min = filters.backArrival.from * 60;
            const max = filters.backArrival.to * 60;
            const arr = toMinutes(t.arrival.to.datetime);
            if (arr < min || arr > max) return false;
        }

        return true;
    };

    return trains.filter(applyOne);
};