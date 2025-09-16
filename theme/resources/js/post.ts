const richText = document.querySelector('.rich-text');

// Katex
setTimeout(async () => {
    // @ts-ignore
    const { default: renderMathInText } = await import('katex/contrib/auto-render/auto-render.js');
    renderMathInText(richText);
}, 0);

// Externalize all link references within the rich text
setTimeout(() => {
    const links = richText?.querySelectorAll('a');
    links?.forEach((link) => link.setAttribute('target', '_blank'));
}, 0);
