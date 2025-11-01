import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchForm.module.css';
import { DirectionInput } from './input/direction/DirectionInput';
import { DateInput } from './input/date/DateInput';
import swapIcon from '../../assets/icons/SearchForm/swap.svg';

const SearchForm: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const navigate = useNavigate();

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // при желании можно добавить в будущем валидацию или передачу данных
    navigate('/search');
  };

  return (
    <section className={styles.search}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Основной контейнер с полями */}
        <div className={styles.fieldsBox}>
          {/* Блок Направление */}
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

          {/* Блок Дата */}
          <div className={styles.group}>
            <h3 className={styles.label}>Дата</h3>
            <div className={styles.row}>
              <DateInput placeholder="ДД/ММ/ГГ" />
              <DateInput placeholder="ДД/ММ/ГГ" />
            </div>
          </div>
        </div>

        {/* Кнопка Найти билеты */}
        <button type="submit" className={styles.submitBtn}>
          Найти билеты
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
