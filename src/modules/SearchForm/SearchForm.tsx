import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchForm.module.css';
import { DirectionInput } from './input/direction/DirectionInput';
import { DateInput } from './input/date/DateInput';
import swapIcon from '../../assets/icons/SearchForm/swap.svg';

interface SearchFormProps {
  isCompact?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ isCompact = false }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const navigate = useNavigate();

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
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
              <DirectionInput placeholder="Откуда" value={from} onChange={setFrom} />
              <button
                type="button"
                className={styles.swapBtn}
                aria-label="Поменять направления"
                onClick={handleSwap}
              >
                <img src={swapIcon} alt="Поменять направления" />
              </button>
              <DirectionInput placeholder="Куда" value={to} onChange={setTo} />
            </div>
          </div>

          <div className={styles.group}>
            <h3 className={styles.label}>Дата</h3>
            <div className={styles.row}>
              <DateInput placeholder="ДД/ММ/ГГ" />
              <DateInput placeholder="ДД/ММ/ГГ" />
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
