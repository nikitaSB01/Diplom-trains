import React, { useState, useEffect, useRef } from "react";
import styles from "./DirectionInput.module.css";
import LocationIcon from '../../../../assets/icons/SearchForm/geo.svg';


interface DirectionInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onCitySelect?: (city: City) => void; // ← ДОБАВИЛ

}

interface City {
  _id: string;
  name: string;
}

export const DirectionInput: React.FC<DirectionInputProps> = ({
  placeholder,
  value,
  onChange,
  onCitySelect,
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Загрузка городов с сервера при вводе
  useEffect(() => {
    const fetchCities = async () => {
      if (value.trim().length < 2) {
        setCities([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://students.netoservices.ru/fe-diplom/routes/cities?name=${encodeURIComponent(value)}`
        );
        if (!response.ok) throw new Error("Ошибка при получении данных");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Ошибка загрузки городов:", error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchCities, 300);
    return () => clearTimeout(delayDebounce);
  }, [value]);

  const handleSelectCity = (cityName: string, cityObj: City) => {
    onChange(cityName);
    onCitySelect?.(cityObj); // ← ОТПРАВЛЯЕМ ВЕСЬ ГОРОД НАРУЖУ
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
    /* //todo 👉 Сбрасываем выбранный объект города, если пользователь снова вводит текст?
    onCitySelect?.(null); */

  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Проверяем, не кликнули ли мы по выпадающему списку
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 150);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        className={styles.input}
        autoComplete="off"
      />
      <img
        src={LocationIcon}
        alt="Геолокация"
        className={`${styles.icon} ${styles.iconLocation}`}
      />
      {isOpen && (cities.length > 0 || loading) && (
        <ul className={styles.dropdown} ref={dropdownRef}>
          {loading ? (
            <li className={styles.option}>Загрузка...</li>
          ) : (
            cities.map((city) => (
              <li key={city._id}>
                <button
                  type="button"
                  className={styles.option}
                  onMouseDown={() => handleSelectCity(city.name, city)}>
                  {city.name}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default DirectionInput;