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
    first: SeatsBlockData[];
    second: SeatsBlockData[];
  }>({
    first: [],
    second: [],
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
    seatsArr: SeatsBlockData[],
    type: string | null
  ) => {
    const needSeats = tickets.adults + tickets.kids;
    const selectedSeats =
      seatsArr.reduce((sum, wagon) => sum + wagon.seats.length, 0);

    // ==== 1) Если мест НЕ НУЖНО → блок всегда корректен ====
    if (needSeats === 0) return false;

    // ==== 2) Если мест НУЖНО, но тип не выбран → некорректен ====
    if (!type) return true;

    // ==== 3) Если мест НУЖНО, но количество не совпадает → некорректен ====
    return needSeats !== selectedSeats;
  };

  // ======== ОБЩЕЕ ЧИСЛО БИЛЕТОВ (только взрослые + дети с местом) ========
  const totalTickets =
    ticketsBlock1.adults + ticketsBlock1.kids +
    ticketsBlock2.adults + ticketsBlock2.kids;

  // ======== ОБЩЕЕ ЧИСЛО ВЫБРАННЫХ МЕСТ ========
  const totalSelectedSeats =
    selectedSeatsData.first.reduce((s, w) => s + w.seats.length, 0) +
    selectedSeatsData.second.reduce((s, w) => s + w.seats.length, 0);

  // ======== ПРАВИЛО ПЕРЕХОДА ДАЛЕЕ ========
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


  function mergeSeatData(
    existing: SeatsBlockData[],
    incoming: SeatsBlockData
  ): SeatsBlockData[] {
    const found = existing.find(s => s.wagonId === incoming.wagonId);

    if (found) {
      // обновление существующего вагона
      return existing.map(s =>
        s.wagonId === incoming.wagonId ? incoming : s
      );
    }

    // добавление нового вагона
    return [...existing, incoming];
  }

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
                    setSelectedSeatsData(prev => ({
                      ...prev,
                      first: mergeSeatData(prev.first, data)
                    }))
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
                      setSelectedSeatsData(prev => ({
                        ...prev,
                        second: mergeSeatData(prev.second, data)
                      }))
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