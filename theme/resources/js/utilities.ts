export const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

export const observe = (target: Element, callback: Function, options: IntersectionObserverInit = {}) => {
    const intersectionObserverCallback = async (
        entries: Array<IntersectionObserverEntry>,
        observer: IntersectionObserver,
    ) => {
        for (const entry of entries) {
            callback(entry, entries, observer);
        }
    };

    const observer = new IntersectionObserver(intersectionObserverCallback, options);

    observer.observe(target);
};
