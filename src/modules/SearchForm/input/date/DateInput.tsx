import React, { useState, useEffect, useRef } from 'react';
import styles from './DateInput.module.css';
import calendarIcon from '../../../../assets/icons/SearchForm/calendar.svg';

interface DateInputProps {
  placeholder: string;
}

export const DateInput: React.FC<DateInputProps> = ({ placeholder }) => {
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

    // Добавляем дни следующего месяца, чтобы всего было 42 (6 недель)
    while (days.length < 42) {
      const nextDay: Date = new Date(
        year,
        month,
        lastDay.getDate() + (days.length - (startDayOfWeek - 1)) + 1,
      );

      days.push({ date: nextDay, otherMonth: true });
    }

    return days;
  };

  const days = getDaysInMonth(currentYear, currentMonth);

  return (
    <div className={styles.inputWrapper} ref={calendarRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setShowCalendar(true)}
        className={styles.input}
      />
      <img src={calendarIcon} alt="Календарь" className={`${styles.icon} ${styles.iconCalendar}`} />

      {showCalendar && (
        <div className={styles.calendarPopup}>
          <div className={styles.calendarHeader}>
            {today.toLocaleString('ru-RU', { month: 'long' })} {currentYear}
          </div>
          <div className={styles.calendarGrid}>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
              <div key={d} className={styles.day} style={{ fontWeight: 700 }}>
                {d}
              </div>
            ))}
            {days.map(({ date, otherMonth }) => {
              const isPast =
                date < new Date(today.getFullYear(), today.getMonth(), today.getDate()) &&
                !otherMonth;
              const isSunday = date.getDay() === 0;
              const isSelected =
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();

              const dayClassName = [
                styles.day,
                otherMonth ? styles.otherMonth : '',
                isPast ? styles.pastDay : '',
                isSunday ? styles.sunday : '',
                isSelected ? styles.selected : '',
              ].join(' ');

              return (
                <div
                  key={date.toISOString()}
                  className={dayClassName}
                  onClick={() => {
                    if (!otherMonth) {
                      handleDayClick(date);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (!otherMonth && (e.key === 'Enter' || e.key === ' ')) {
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
