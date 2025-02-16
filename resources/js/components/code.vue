<script setup lang="ts">
import { onMounted, ref, useHost } from 'vue';
import { sleep } from '../utilities';
import { ClipboardCheck, Copy } from '@iconoir/vue';

const host = useHost()!;
const copied = ref(false);

defineOptions({ inheritAttrs: false });

onMounted(async () => {
    const { default: hljs } = await import('highlight.js');
    hljs.highlightElement(host);
});

const copy = async () => {
    navigator.clipboard.writeText(host.textContent!);
    copied.value = true;
    await sleep(2250);
    copied.value = false;
};
</script>

<template>
    <div>
        <pre>
            <code><slot /></code>
        </pre>
        <button :class="['code-copy', { copied }]" @click="copy" title="Click to copy">
            <Copy v-if="!copied" width="16" height="16" />
            <ClipboardCheck v-if="copied" width="16" height="16" />
        </button>
    </div>
</template>

<style scoped>
div {
    position: relative;
}

pre {
    display: flex;
    overflow-x: auto;
    font-weight: 400;
    font-size: 0.875em;
    line-height: 1.7142857;
    padding: 0.8571429em 1.1428571em;
    margin: unset;
}

code {
    font-family: inherit;
    background: transparent;
}

button {
    color: inherit;
    border: unset;
    background: unset;
    color: #9399b2;
    border-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    isolation: isolate;
    padding: 0.5rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    transition-property: color, background;
    transition-duration: var(--animation-duration);

    &.copied {
        color: var(--successful-subtle);
        background: var(--successful);
    }
}
</style>
