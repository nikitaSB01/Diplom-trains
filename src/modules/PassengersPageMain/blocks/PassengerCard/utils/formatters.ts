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

export const formatBirthCertificate = (value: string) => {
    // 1. Очищаем ввод — оставляем только римские + русские буквы + цифры
    let cleaned = value
        .toUpperCase()
        .replace(/[^IVXLCDMА-Я0-9]/g, "");

    // 2. Выделяем части
    const roman = cleaned.match(/^[IVXLCDM]+/)?.[0] ?? "";
    const letters = cleaned.slice(roman.length).match(/^[А-Я]{0,2}/)?.[0] ?? "";
    const digits = cleaned.slice(roman.length + letters.length).replace(/\D/g, "").slice(0, 6);

    // 3. Собираем строку с автоматическими пробелами
    let result = roman;

    if (letters.length > 0) {
        result += " " + letters;
    }

    if (digits.length > 0) {
        result += " " + digits;
    }

    return result.trim();
};

/* Маска телефона */
export const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);

    let result = "+7 ";

    if (digits.length > 1) result += digits.substring(1, 4);
    if (digits.length >= 5) result += " " + digits.substring(4, 7);
    if (digits.length >= 8) result += " " + digits.substring(7, 9);
    if (digits.length >= 10) result += " " + digits.substring(9, 11);

    return result.trim();
};

/* Чистка emailf */
export const cleanEmail = (value: string) => {
    return value.replace(/[^a-zA-Z0-9@._-]/g, "").toLowerCase();
};