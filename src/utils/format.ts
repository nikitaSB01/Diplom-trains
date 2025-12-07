/** Формат времени по unix-timestamp (секунды) → "HH:MM" */
export const formatTime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

/** Формат даты по unix-timestamp (секунды) → локальная дата */
export const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString("ru-RU");
};

/** Формат цены с разделителями тысяч */
export const formatPrice = (price: number): string => {
    return price.toLocaleString("ru-RU");
};