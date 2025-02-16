<script setup lang="ts">
import { onMounted, ref, useHost } from 'vue';
import { observe } from '../utilities';
import { SystemRestart } from '@iconoir/vue';

const host = useHost();

const props = defineProps<{
    src: string;
}>();

const layout = {
    font: {
        family: 'ui-monospace, monospace;',
        color: '#a1a1aa',
    },
    xaxis: { gridcolor: '#71717a' },
    yaxis: { gridcolor: '#71717a' },
    margin: {
        l: 48,
        b: 40,
        r: 48,
        t: 24,
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    modebar: {
        orientation: 'v',
    },
    legend: {
        orientation: 'h',
    },
};

const config = {
    displayModeBar: true,
    responsive: true,
    modeBarButtonsToRemove: ['toImage'],
};

onMounted(async () => {
    host!.innerHTML = '';

    // @ts-ignore
    const Plotly = await import('plotly.js-dist');

    observe(host as HTMLElement, async (entry: any) => {
        if (host?.hasAttribute('init')) return;

        if (entry.isIntersecting) {
            const file = await (await fetch(props.src)).json();
            Plotly.newPlot(host, file, layout, config);

            host?.setAttribute('init', 'true');
        }
    });
});
</script>

<template>
    <slot />
</template>
