import React from "react";
import { useLocation } from "react-router-dom";

const PassengersPage = () => {
    const { state } = useLocation();

    console.log("Полученные данные:", state);

    return (
        <div>
            <h1>Страница пассажиров</h1>
        </div>
    );
};

export default PassengersPage;