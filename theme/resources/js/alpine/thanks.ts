const thanks = () => ({
    async init() {
        const { default: JSConfetti } = await import('js-confetti');

        const jsConfetti = new JSConfetti();
        const confettiConfig = {
            confettiColors: [
                '#f43f5e',
                '#ec4899',
                '#d946ef',
                '#a855f7',
                '#8b5cf6',
                '#6366f1',
                '#3b82f6',
                '#0ea5e9',
                '#06b6d4',
                '#14b8a6',
                '#10b981',
                '#22c55e',
                '#84cc16',
                '#eab308',
                '#f59e0b',
                '#f97316',
                '#ef4444',
            ],
            confettiRadius: 4,
        };

        jsConfetti.addConfetti(confettiConfig);

        setInterval(() => {
            jsConfetti.addConfetti(confettiConfig);
        }, 3 * 1000);
    },
});

export default thanks;
