import { sleep } from '@/resources/js/utilities';

const navigation = () => ({
    shared: false,
    open: false,
    scroll: 0,

    toggle() {
        this.open = !this.open;
    },

    skip() {
        const content = document.querySelector('main :is(a, button, input, select, textarea)') as HTMLElement;
        content.focus();
    },

    async share(data: ShareData) {
        try {
            await navigator.share(data);
        } catch {
            await navigator.clipboard.writeText(data.url!);
            this.shared = true;
            await sleep(2250);
            this.shared = false;
        }
    },
});

export default navigation;
