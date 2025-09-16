import { defineCustomElement } from 'vue';
import { observe } from './utilities';

// @ts-ignore
const context = import.meta.webpackContext('./components', {
    recursive: false,
    regExp: /\.vue$/,
    mode: 'lazy',
});

const components = context.keys().map((key: string) => {
    const componentName = key.replace('./', '').replace('.vue', '').toLowerCase();
    return `vue-${componentName}`;
});

const replaceCodeElement = (elements: NodeListOf<Element>) => {
    for (const element of elements) {
        const code = element.querySelector('code');
        element.outerHTML = `<vue-code class="${code?.classList.value}">${code?.innerHTML}</vue-code>`;
    }
};

export const registerVueComponents = async () => {
    replaceCodeElement(document.querySelectorAll('pre:has(code)'));

    const vueElements = document.querySelectorAll(components.join(', '));
    if (vueElements.length === 0) return;

    const loadedComponents = new Set<string>();

    for (const element of vueElements) {
        observe(element, async (entry: IntersectionObserverEntry) => {
            if (!entry.isIntersecting) return;

            const componentName = element.tagName.toLowerCase().replace('vue-', '');

            if (loadedComponents.has(componentName)) return;

            const componentFile = context.keys().find((key: string) => key.includes(componentName.toLowerCase()));

            if (componentFile) {
                const { default: element } = await context(componentFile);
                const customElement = defineCustomElement(element);

                if (!customElements.get(`vue-${element.__name}`)) {
                    customElements.define(`vue-${element.__name}`, customElement);
                    loadedComponents.add(componentName);
                }
            }
        });
    }
};
