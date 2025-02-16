import { registerVueComponents } from './vue';

const richText = document.querySelector('.rich-text');

// Vue components
registerVueComponents();

// Katex
setTimeout(async () => {
    // @ts-ignore
    const { default: renderMathInText } = await import('katex/contrib/auto-render/auto-render.js');
    renderMathInText(richText);
}, 0);
