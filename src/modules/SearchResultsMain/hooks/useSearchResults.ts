import { useEffect, useState } from "react";
import { Train } from "../../../types/Train/trainTypes";
import { FiltersState } from "../../../types/filtersTypes/filtersTypes";
import { SeatWithPrice } from "../../../types/seat";

export interface SeatsBlockData {
    blockId: "first" | "second";
    type: string;
    wagonId: string;
    seats: SeatWithPrice[];
    services: {
        wifi: boolean;
        linens: boolean;
        wifi_price: number;
        linens_price: number;
        total: number;
    };
}


export const useSearchResults = (state: any) => {
    const from = state.from?.from ?? state.from ?? null;
    const to = state.to?.to ?? state.to ?? null;
    const dateStart = state.dateStart?.dateStart ?? state.dateStart ?? "";
    const dateEnd = state.dateEnd?.dateEnd ?? state.dateEnd ?? "";

    const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
    const [isChoosingSeats, setIsChoosingSeats] = useState(false);

    const [filters, setFilters] = useState<FiltersState>({
        options: {},
        price: null,
        thereDeparture: null,
        thereArrival: null,
        backDeparture: null,
        backArrival: null,
    });

    const [ticketsBlock1, setTicketsBlock1] = useState({
        adults: 0,
        kids: 0,
        kidsNoSeat: 0,
    });

    const [ticketsBlock2, setTicketsBlock2] = useState({
        adults: 0,
        kids: 0,
        kidsNoSeat: 0,
    });

    const [selectedSeatsData, setSelectedSeatsData] = useState<{
        first: SeatsBlockData[];
        second: SeatsBlockData[];
    }>({
        first: [],
        second: [],
    });

    const [firstType, setFirstType] = useState<string | null>(null);
    const [secondType, setSecondType] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);

    // delay loader hiding
    useEffect(() => {
        if (isLoading) {
            setShowLoader(true);
        } else {
            const t = setTimeout(() => setShowLoader(false), 400);
            return () => clearTimeout(t);
        }
    }, [isLoading]);

    const mergeSeatData = (
        existing: SeatsBlockData[],
        incoming: SeatsBlockData
    ): SeatsBlockData[] => {
        const found = existing.find((s) => s.wagonId === incoming.wagonId);

        if (found) {
            return existing.map((s) =>
                s.wagonId === incoming.wagonId ? incoming : s
            );
        }

        return [...existing, incoming];
    };

    const isBlockIncorrect = (
        tickets: { adults: number; kids: number; kidsNoSeat: number },
        seatsArr: SeatsBlockData[],
        type: string | null
    ) => {
        const need = tickets.adults + tickets.kids;
        const selected = seatsArr.reduce((s, w) => s + w.seats.length, 0);

        if (selected > need) return true;
        if (need === 0 && selected > 0) return true;
        if (need === 0 && selected === 0) return false;
        if (!type) return true;

        return need !== selected;
    };

    const block1Incorrect = isBlockIncorrect(
        ticketsBlock1,
        selectedSeatsData.first,
        firstType
    );

    const block2Incorrect = isBlockIncorrect(
        ticketsBlock2,
        selectedSeatsData.second,
        secondType
    );

    const anyTicketsNeeded =
        ticketsBlock1.adults + ticketsBlock1.kids +
        ticketsBlock2.adults + ticketsBlock2.kids > 0;

    const showNext = anyTicketsNeeded && !block1Incorrect && !block2Incorrect;

    const hasReturnDirection = !!selectedTrain?.arrival;

    return {
        from,
        to,
        dateStart,
        dateEnd,

        selectedTrain,
        setSelectedTrain,

        isChoosingSeats,
        setIsChoosingSeats,

        filters,
        setFilters,

        ticketsBlock1,
        setTicketsBlock1,

        ticketsBlock2,
        setTicketsBlock2,

        selectedSeatsData,
        setSelectedSeatsData,

        firstType,
        setFirstType,

        secondType,
        setSecondType,

        mergeSeatData,

        isLoading,
        setIsLoading,
        showLoader,

        block1Incorrect,
        block2Incorrect,
        showNext,
        hasReturnDirection
    };
};