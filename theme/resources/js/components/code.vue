<script setup lang="ts">
import { onMounted, ref, useHost } from 'vue';
import { observe, sleep } from '../utilities';
import { ClipboardCheck, Copy } from '@iconoir/vue';

const host = useHost()!;
const copied = ref(false);

defineOptions({ inheritAttrs: false });

onMounted(async () => {
    const { codeToHtml } = await import('shiki/bundle/web');

    observe(host as HTMLElement, async (entry: any) => {
        if (host?.hasAttribute('init')) return;

        if (entry.isIntersecting) {
            const html = await codeToHtml(host.textContent!, {
                lang: host.className.split('-')[1],
                theme: 'catppuccin-mocha',
            });

            host.innerHTML = html;
            host?.setAttribute('init', 'true');
        }
    });
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
        <slot />
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
