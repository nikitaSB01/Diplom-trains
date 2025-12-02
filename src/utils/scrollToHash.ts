export const scrollToHash = () => {
    const hash = window.location.hash.replace('#', '');

    if (!hash) return;

    const el = document.getElementById(hash);
    if (!el) return;

    setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
};