import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SeatWithPrice } from "../../types/seat";

import styles from './Main.module.css';
import Steps from '../../components/Steps/Steps';
import Filters from '../../components/SearchPageMain/Filters/Filters';
import FiltersLastTickets from '../../components/SearchPageMain/FiltersLastTickets/FiltersLastTickets';
import Trains from '../../components/SearchPageMain/Trains/Trains';
import { useLocation } from 'react-router-dom';
import { FiltersState } from "../../types/filtersTypes/filtersTypes";
import LoaderGif from "../../assets/gif/анимация-загрузки.gif"
import { Train } from "../../types/Train/trainTypes";
import ChoiceLocationTrains from "../../components/SearchPageMain/ChoiceLocationTrains/ChoiceLocationTrains";


interface SeatsBlockData {
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

const Main: React.FC = () => {

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
    first: SeatsBlockData | null;
    second: SeatsBlockData | null;
  }>({
    first: null,
    second: null,
  });

  /* данные по хранению активного типа вагона */
  const [firstType, setFirstType] = useState<string | null>(null);
  const [secondType, setSecondType] = useState<string | null>(null);

  const location = useLocation();
  const { from, to, dateStart, dateEnd } = location.state || {};

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

  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => setShowLoader(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);



  const isBlockIncorrect = (
    tickets: { adults: number; kids: number; kidsNoSeat: number },
    seatsData: SeatsBlockData | null,
    type: string | null
  ) => {
    const needSeats = tickets.adults + tickets.kids;
    const selectedSeats = seatsData?.seats?.length || 0;

    if (needSeats === 0) return selectedSeats > 0;

    if (!type) return true;

    return needSeats !== selectedSeats;
  };

  const block1Incorrect = isBlockIncorrect(ticketsBlock1, selectedSeatsData.first, firstType);
  const block2Incorrect = isBlockIncorrect(ticketsBlock2, selectedSeatsData.second, secondType);

  const block1HasTickets =
    ticketsBlock1.adults > 0 ||
    ticketsBlock1.kids > 0;

  const block2HasTickets =
    ticketsBlock2.adults > 0 ||
    ticketsBlock2.kids > 0;

  const totalTicketsBlock1 =
    ticketsBlock1.adults + ticketsBlock1.kids;

  const totalTicketsBlock2 =
    ticketsBlock2.adults + ticketsBlock2.kids;
  const block1Ready =
    firstType &&
    totalTicketsBlock1 > 0 &&
    selectedSeatsData.first?.seats?.length === totalTicketsBlock1;

  const block2Ready =
    secondType &&
    totalTicketsBlock2 > 0 &&
    selectedSeatsData.second?.seats?.length === totalTicketsBlock2;


  const showNext =
    (block1Ready && !block2Incorrect) ||
    (block2Ready && !block1Incorrect);


  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/passengers", {
      state: {
        train: selectedTrain,
        types: { firstType, secondType },
        tickets: {
          first: ticketsBlock1,
          second: ticketsBlock2
        }, seats: selectedSeatsData,
        filters,
      },
    });
  };


  return (
    <section className={styles.main}>

      {showLoader && (
        <div className={styles.loaderOverlay}>
          <p className={styles.loadingText}>Идёт поиск</p>
          <img src={LoaderGif} alt="" className={styles.loaderGif} />
        </div>
      )}

      <div className={`${styles.mainContainer} ${showLoader ? styles.loadingState : ""}`}>
        <Steps currentStep={1} />

        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <Filters onChange={setFilters} dateStart={dateStart} dateEnd={dateEnd} />
            <FiltersLastTickets />
          </div>

          <div className={styles.rightColumn}>

            {/* список поездов */}
            <div
              className={styles.listTrains}
              style={{ display: isChoosingSeats ? "none" : "block" }}
            >
              {from && to && (
                <Trains
                  fromCity={from}
                  toCity={to}
                  dateStart={dateStart}
                  dateEnd={dateEnd}
                  filters={filters}
                  onLoadingChange={setIsLoading}
                  onSelectTrain={(train) => {
                    setSelectedTrain(train);
                    setIsChoosingSeats(true);
                  }}
                />
              )}
            </div>

            {/* выбор мест */}
            <div
              className={styles.choiceLocationTrains}
              style={{ display: isChoosingSeats ? "block" : "none" }}
            >
              {/* Первый блок */}
              {selectedTrain && (
                <ChoiceLocationTrains
                  blockId="first"
                  isSecond={false}
                  train={selectedTrain}
                  selectedType={firstType}
                  disabledType={secondType}   // ← ВАЖНО
                  onBack={() => {
                    setIsChoosingSeats(false);
                    setSelectedTrain(null);
                    setFirstType(null);
                    setSecondType(null);
                  }}
                  onSelectType={(type) => {
                    setFirstType(type);
                  }}
                  onUpdateTickets={(data) =>
                    setTicketsBlock1(prev => ({
                      ...prev,
                      ...data,
                    }))
                  } onUpdateSeats={(data) =>
                    setSelectedSeatsData(prev => ({ ...prev, first: data }))
                  }
                />
              )}

              {/* Второй блок — выводим КОГДА выбран тип */}
              {firstType && selectedTrain && (
                <div className={styles.secondTrainBlock}>
                  <ChoiceLocationTrains
                    blockId="second"
                    isSecond={true}
                    train={selectedTrain}
                    selectedType={secondType}
                    disabledType={firstType}    // ← ВАЖНО
                    onBack={() => {
                      setIsChoosingSeats(false);
                      setSelectedTrain(null);
                      setFirstType(null);
                      setSecondType(null);
                    }}
                    onSelectType={(type) => {
                      setSecondType(type);
                    }}
                    onUpdateTickets={(data) =>
                      setTicketsBlock2(prev => ({
                        ...prev,
                        ...data,
                      }))
                    } onUpdateSeats={(data) =>
                      setSelectedSeatsData(prev => ({ ...prev, second: data }))
                    }
                  />
                </div>
              )}
            </div>

            {isChoosingSeats && showNext && (
              <button
                className={styles.nextButton}
                onClick={handleNext}
              >
                Далее
              </button>
            )}

          </div>
        </div>
      </div>

    </section>
  );
}

export default Main;