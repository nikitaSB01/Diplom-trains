// utils/validation.ts

export const onlyLetters = (value: string) => /^[А-Яа-яЁё]+$/.test(value.trim());

export const validatePassenger = (data: any) => {
    // ФИО
    if (!data.lastName.trim()) return "Поле Фамилии не заполнено";
    if (!onlyLetters(data.lastName)) return "Фамилия должна содержать только буквы";

    if (!data.firstName.trim()) return "Поле Имени не заполнено";
    if (!onlyLetters(data.firstName)) return "Имя должно содержать только буквы";

    if (data.patronymic && !onlyLetters(data.patronymic))
        return "Отчество должно содержать только буквы";

    // Пол
    if (!data.gender) return "Пол не выбран";

    // Дата рождения
    if (!data.birthday || data.birthday.length !== 10)
        return "Дата рождения указана некорректно";

    const [dd, mm, yyyy] = data.birthday.split("/").map(Number);

    if (dd < 1 || dd > 31) return "Некорректный день";
    if (mm < 1 || mm > 12) return "Некорректный месяц";
    if (yyyy < 1900 || yyyy > new Date().getFullYear())
        return "Некорректный год";

    // ПАСПОРТ
    if (data.docType === "Паспорт РФ") {
        if (data.docSeries.length !== 4) return "Серия паспорта указана некорректно";
        if (data.docNumber.length !== 6) return "Номер паспорта указан некорректно";
    }

    // СВИДЕТЕЛЬСТВО
    if (data.docType === "Свидетельство о рождении") {
        const regex = /^[IVXLCDM]+\s+[А-Я]{2}\s+\d{6}$/;
        if (!regex.test(data.docNumber.trim())) {
            return "Номер свидетельства о рождении некорректен. Пример: VIII УН 123456";
        }
    }

    return "";
};

/* Валидация телефона */
export const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 11 && digits.startsWith("7");
};
/* Валидация E-mail */
export const validateEmail = (value: string) => {
    const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value.trim());
};