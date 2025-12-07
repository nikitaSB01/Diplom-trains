import { useNavigate } from "react-router-dom";

import styles from './Main.module.css';
import Steps from '../../components/Steps/Steps';
import Filters from './Filters/Filters';
import FiltersLastTickets from './FiltersLastTickets/FiltersLastTickets';
import Trains from './Trains/Trains';
import { useLocation } from 'react-router-dom';
import LoaderGif from "../../assets/gif/анимация-загрузки.gif"
import { Train } from "../../types/Train/trainTypes";
import ChoiceLocationTrains from "./ChoiceLocationTrains/ChoiceLocationTrains";
import { useSearchResults } from "./hooks/useSearchResults";


const Main: React.FC = () => {
  const location = useLocation();
  const {
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
  } = useSearchResults(location.state || {});

  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/passengers", {
      state: {
        from,
        to,
        dateStart,
        dateEnd,

        orderData: {
          train: selectedTrain,
          tickets: {
            first: ticketsBlock1,
            second: ticketsBlock2
          },
          seats: selectedSeatsData,
          types: { firstType, secondType },
          filters
        }
      }
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
                  direction={selectedTrain.departure}
                  onBack={() => {
                    setIsChoosingSeats(false);
                    setSelectedTrain(null);
                    setTicketsBlock1({ adults: 0, kids: 0, kidsNoSeat: 0 });
                    setTicketsBlock2({ adults: 0, kids: 0, kidsNoSeat: 0 });
                    setFirstType(null);
                    setSecondType(null);
                  }}
                  onSelectType={(type) => {
                    // обновляем тип
                    setFirstType(type);
                    // ОЧИЩАЕМ все выбранные места этого блока
                    setSelectedSeatsData(prev => ({
                      ...prev,
                      first: []
                    }));
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

              {hasReturnDirection && selectedTrain && (
                <div className={styles.secondTrainBlock}>
                  <ChoiceLocationTrains
                    blockId="second"
                    isSecond={true}
                    train={selectedTrain}
                    direction={selectedTrain.arrival || null}
                    selectedType={secondType}
                    onBack={() => {
                      setIsChoosingSeats(false);
                      setSelectedTrain(null);
                      setTicketsBlock1({ adults: 0, kids: 0, kidsNoSeat: 0 });
                      setTicketsBlock2({ adults: 0, kids: 0, kidsNoSeat: 0 });
                      setFirstType(null);
                      setSecondType(null);
                    }}
                    onSelectType={(type) => {
                      setSecondType(type);
                      setSelectedSeatsData(prev => ({
                        ...prev,
                        second: []
                      }));
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