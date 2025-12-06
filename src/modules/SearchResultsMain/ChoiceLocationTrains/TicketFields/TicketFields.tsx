import React from "react";
import styles from "./TicketFields.module.css";

import TicketField from "../TicketField/TicketField";

export const TicketFields = ({ onUpdateTickets }: any) => (
    <div className={styles.ticketsBlock}>
        <h2 className={styles.blockTitle}>Количество билетов</h2>

        <div className={styles.ticketFields}>
            <TicketField
                label="Взрослых —"
                max={3}
                hint="Можно добавить 3 пассажиров"
                onUpdateTickets={onUpdateTickets}
            />

            <TicketField
                label="Детских —"
                max={3}
                hint="Можно добавить 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50%"
                onUpdateTickets={onUpdateTickets}
            />

            <TicketField
                label="Детских «без места» —"
                max={2}
                hint="Можно добавить 2 детей"
                onUpdateTickets={onUpdateTickets}
            />
        </div>
    </div>
);