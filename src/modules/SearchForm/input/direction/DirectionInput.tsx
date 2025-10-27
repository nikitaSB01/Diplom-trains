import React, { useState, useEffect } from 'react';
import styles from './DirectionInput.module.css';
import { cities } from '../../cities';
import locationIcon from '../../../../assets/icons/SearchForm/geo.svg';

interface DirectionInputProps {
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const DirectionInput: React.FC<DirectionInputProps> = ({ placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const filteredCities = cities.filter((city) => city.toLowerCase().includes(value.toLowerCase()));

  const handleSelect = (city: string) => {
    onChange(city);
    setIsFocused(false);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        className={styles.input}
      />
      <img src={locationIcon} alt="Локация" className={`${styles.icon} ${styles.iconLocation}`} />

      {isFocused && (
        <ul className={styles.dropdown}>
          {filteredCities.map((city) => (
            <li key={city}>
              <button type="button" className={styles.option} onClick={() => handleSelect(city)}>
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
