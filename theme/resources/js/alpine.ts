import Alpine from 'alpinejs';

declare global {
    interface Window {
        Alpine: any;
    }
}

export const registerAlpineComponents = async () => {
    // @ts-ignore
    const context = import.meta.webpackContext('./alpine', {
        recursive: false,
        regExp: /\.ts$/,
        mode: 'lazy',
    });

    for (const key of context.keys()) {
        const { default: component } = await context(key);
        const name = key.split('/').pop()?.replace('.ts', '');

        Alpine.data(name!, component);
    }

    Alpine.start();
};
