// utils/formatters.ts

// Только русские буквы
export const cleanLetters = (value: string) => {
    return value.replace(/[^А-Яа-яЁё]/g, "");
};

// Первая буква — заглавная
export const capitalize = (value: string) => {
    if (!value) return "";
    const lower = value.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
};

// Формат даты ДД/ММ/ГГГГ
export const formatBirthday = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    let result = "";
    if (digits.length >= 1) result = digits.substring(0, 2);
    if (digits.length >= 3) result += "/" + digits.substring(2, 4);
    if (digits.length >= 5) result += "/" + digits.substring(4, 8);

    return result;
};

// Маска серии паспорта (4 цифры)
export const formatSeries = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 4);
};

// Маска номера паспорта (6 цифр)
export const formatNumber = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 6);
};