import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchForm.module.css';
import { DirectionInput } from './input/direction/DirectionInput';
import { DateInput } from './input/date/DateInput';
import swapIcon from '../../assets/icons/SearchForm/swap.svg';
import { City } from '../../types/City';


interface SearchFormProps {
  isCompact?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ isCompact = false }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromCityObj, setFromCityObj] = useState<City | null>(null);
  const [toCityObj, setToCityObj] = useState<City | null>(null);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  const navigate = useNavigate();

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search', {
      state: {
        from: fromCityObj,
        to: toCityObj,
        dateStart,
        dateEnd,
      },
    });
  };

  return (
    <section className={`${styles.search} ${isCompact ? styles.compactSearch : ''}`}>
      <form
        className={`${styles.form} ${isCompact ? styles.compactForm : ''}`}
        onSubmit={handleSubmit}
      >
        <div className={styles.fieldsBox}>
          <div className={styles.group}>
            <h3 className={styles.label}>Направление</h3>
            <div className={styles.row}>
              <DirectionInput placeholder="Откуда" value={from} onChange={setFrom} onCitySelect={setFromCityObj}
              />
              <button
                type="button"
                className={styles.swapBtn}
                aria-label="Поменять направления"
                onClick={handleSwap}
              >
                <img src={swapIcon} alt="Поменять направления" />
              </button>
              <DirectionInput placeholder="Куда" value={to} onChange={setTo} onCitySelect={setToCityObj}
              />
            </div>
          </div>

          <div className={styles.group}>
            <h3 className={styles.label}>Дата</h3>
            <div className={styles.row}>
              <DateInput
                placeholder="ДД/ММ/ГГ"
                value={dateStart}
                onChange={setDateStart}
              />

              <DateInput
                placeholder="ДД/ММ/ГГ"
                value={dateEnd}
                onChange={setDateEnd}
              />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Найти билеты
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
