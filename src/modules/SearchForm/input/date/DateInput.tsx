import React, { useState, useEffect, useRef } from 'react';
import styles from './DateInput.module.css';
import calendarIcon from '../../../../assets/icons/SearchForm/calendar.svg';
import arrowLeft from '../../../../assets/icons/SearchForm/arrowL.png';
import arrowRight from '../../../../assets/icons/SearchForm/arrowR.png';

interface DateInputProps {
  placeholder: string;
  isCompact?: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({ placeholder, isCompact = false}) => {
  const [value, setValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Закрытие календаря при клике вне блока
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Формат даты
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 8) input = input.slice(0, 8);
    if (input.length > 4) {
      input = input.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    } else if (input.length > 2) {
      input = input.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }
    setValue(input);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setValue(formatDate(date));
    setShowCalendar(false);
  };

  // Получение дней месяца
  const getDaysInMonth = (year: number, month: number) => {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay() || 7;
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Дни предыдущего месяца
    for (let i = startDayOfWeek - 1; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i + 1),
        otherMonth: true,
      });
    }

    // Текущий месяц
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        otherMonth: false,
      });
    }

    // Добавляем дни следующего месяца, чтобы общее количество было кратно 7
    const totalCells = Math.ceil(days.length / 7) * 7;
    const extraDays = totalCells - days.length;

    for (let i = 1; i <= extraDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        otherMonth: true,
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentYear, currentMonth);

  // определяем высоту календаря
  const rowsCount = Math.ceil(days.length / 7);
  const popupHeight = rowsCount === 6 ? '322px' : '302px';

  return (
    <div
      className={`${styles.inputWrapper} ${isCompact ? styles.compact : ""}`}
      ref={calendarRef}
    >      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowCalendar(true)}
        className={styles.input}
      />
      <img src={calendarIcon} alt="Календарь" className={`${styles.icon} ${styles.iconCalendar}`} />

      {showCalendar && (
        <div className={styles.calendarPopup} style={{ height: popupHeight }}>
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear((y) => y - 1);
                } else {
                  setCurrentMonth((m) => m - 1);
                }
              }}
            >
              <img src={arrowLeft} alt="Назад" />
            </button>

            <span className={styles.monthName}>
              {new Date(currentYear, currentMonth).toLocaleString('ru-RU', {
                month: 'long',
              })}
            </span>

            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear((y) => y + 1);
                } else {
                  setCurrentMonth((m) => m + 1);
                }
              }}
            >
              <img src={arrowRight} alt="Вперёд" />
            </button>
          </div>

          <div className={styles.calendarGrid}>
            {days.map(({ date, otherMonth }) => {
              const isPast =
                date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isSunday = date.getDay() === 0;
              const isSelected =
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();

              const dayClassName = [
                styles.day,
                otherMonth ? styles.otherMonth : '',
                isPast && !otherMonth ? styles.pastDay : '',
                isSunday && otherMonth ? styles.otherSunday : '',
                isSunday && isPast && !otherMonth ? styles.pastSunday : '',
                isSunday && !isPast && !otherMonth ? styles.sunday : '',
                isSelected ? styles.selected : '',
              ].join(' ');

              return (
                <div
                  key={date.toISOString()}
                  className={dayClassName}
                  onClick={() => !isPast && handleDayClick(date)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !isPast) {
                      handleDayClick(date);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
