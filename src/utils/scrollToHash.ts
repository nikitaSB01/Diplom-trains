export const scrollToHash = () => {
    const hash = window.location.hash; // "#/?about"

    const param = hash.split("?")[1]; // "about"
    if (!param) return;

    const el = document.getElementById(param);
    if (!el) return;

    setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
};