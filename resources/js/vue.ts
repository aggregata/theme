import { defineCustomElement } from 'vue';

const components = ['vue-code', 'vue-contents', 'vue-plot'];

export const registerVueComponents = async () => {
    const codeElements = document.querySelectorAll<HTMLElement>('pre:has(code)');

    for (const element of codeElements) {
        const code = element.querySelector('code');
        element.outerHTML = `<vue-code class="${code?.classList.value}">${code?.innerHTML}</vue-code>`;
    }

    const vueElements = document.querySelectorAll(components.join(', '));

    if (vueElements.length === 0) return;

    // @ts-ignore
    const context = import.meta.webpackContext('./components', {
        recursive: false,
        regExp: /\.vue$/,
        mode: 'lazy',
    });

    for (const key of context.keys()) {
        const { default: element } = await context(key);
        const customElement = defineCustomElement(element);

        customElements.define(`vue-${element.__name}`, customElement);
    }
};
