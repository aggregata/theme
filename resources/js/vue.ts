import { defineCustomElement } from 'vue';
import { observe } from './utilities';

const components = ['vue-code', 'vue-contents', 'vue-plot'];

export const registerVueComponents = async () => {
    const codeElements = document.querySelectorAll<HTMLElement>('pre:has(code)');

    // Swap out the code element with a component
    for (const element of codeElements) {
        const code = element.querySelector('code');
        element.outerHTML = `<vue-code class="${code?.classList.value}">${code?.innerHTML}</vue-code>`;
    }

    // Skip if no elements are found
    const vueElements = document.querySelectorAll(components.join(', '));
    if (vueElements.length === 0) return;

    // @ts-ignore
    const context = import.meta.webpackContext('./components', {
        recursive: false,
        regExp: /\.vue$/,
        mode: 'lazy',
    });

    // Create a Set to track loaded components
    const loadedComponents = new Set<string>();

    // Observe each Vue element
    for (const element of vueElements) {
        observe(element, async (entry: IntersectionObserverEntry) => {
            if (!entry.isIntersecting) return;

            const componentName = element.tagName.toLowerCase().replace('vue-', '');

            // Skip if component is already loaded
            if (loadedComponents.has(componentName)) return;

            // Find the matching component file
            const componentFile = context.keys().find((key: string) => key.includes(componentName.toLowerCase()));

            if (componentFile) {
                const { default: element } = await context(componentFile);
                const customElement = defineCustomElement(element);

                // Define the custom element if it doesn't exist
                if (!customElements.get(`vue-${element.__name}`)) {
                    customElements.define(`vue-${element.__name}`, customElement);
                    loadedComponents.add(componentName);
                }
            }
        });
    }
};
