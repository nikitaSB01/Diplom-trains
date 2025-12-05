import { useEffect, useState } from "react";
import { PassengerFormData, OrderData } from "../../../types/passengers";
import { buildPassengerBlock } from "../utils/buildPassengerBlock";
import { SeatData } from "../../../types/passengers";

export const usePassengersPage = (
    orderData: OrderData,
    passengers: PassengerFormData[] | null,
    block1Initial: any,
    block2Initial: any,
    totalPriceInitial: number
) => {
    const seatsFirst: SeatData[] = orderData.seats.first || [];
    const seatsSecond: SeatData[] = orderData.seats.second || [];

    const block1 = block1Initial ?? buildPassengerBlock(orderData.tickets.first, seatsFirst);
    const block2 = block2Initial ?? buildPassengerBlock(orderData.tickets.second, seatsSecond);

    const totalPrice = totalPriceInitial ?? (block1?.total ?? 0) + (block2?.total ?? 0);

    const baseCount =
        passengers?.length ??
        ((block1?.passengers.adults ?? 0) +
            (block1?.passengers.kids ?? 0) +
            (block1?.passengers.kidsNoSeat ?? 0));

    const [extraPassengers, setExtraPassengers] = useState<number>(0);

    const totalCards = baseCount + extraPassengers;

    const [completedMap, setCompletedMap] = useState<boolean[]>(
        passengers ? passengers.map(() => true) : Array(totalCards).fill(false)
    );

    useEffect(() => {
        if (!passengers) {
            setCompletedMap(Array(totalCards).fill(false));
        }
    }, [totalCards, passengers]);

    const handleCompleteChange = (index: number, completed: boolean) => {
        setCompletedMap((prev) => {
            const copy = [...prev];
            copy[index] = completed;
            return copy;
        });
    };

    const handleRequestOpenNext = (index: number) => {
        const next = index + 1;
        const nextCard = document.getElementById(`passenger-card-${next}`);

        if (nextCard) {
            const headerBtn = nextCard.querySelector("button");
            headerBtn?.click();
            nextCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const [formDataList, setFormDataList] = useState<any[]>(
        passengers || Array(totalCards).fill(null)
    );

    useEffect(() => {
        if (!passengers) {
            setFormDataList(Array(totalCards).fill(null));
        }
    }, [totalCards, passengers]);

    const handleUpdatePassenger = (index: number, data: any) => {
        setFormDataList((prev) => {
            const copy = [...prev];
            copy[index] = data;
            return copy;
        });
    };

    const calcCategories = () => {
        let adults = 0;
        let kids = 0;

        formDataList.forEach((p) => {
            if (!p) return;

            if (p.ticketType === "adult") adults++;
            if (p.ticketType === "child") kids++;
        });

        return { adults, kids };
    };

    const entered = calcCategories();

    const requiredAdults = block1?.passengers.adults ?? 0;
    const requiredKids = block1?.passengers.kids ?? 0;

    const categoriesMatch =
        entered.adults === requiredAdults &&
        entered.kids === requiredKids;

    const allCompleted = completedMap.every(Boolean);

    const canGoNext = allCompleted && categoriesMatch;

    return {
        block1,
        block2,
        totalPrice,
        baseCount,
        extraPassengers,
        setExtraPassengers,
        completedMap,
        handleCompleteChange,
        handleRequestOpenNext,
        formDataList,
        handleUpdatePassenger,
        canGoNext
    };
};