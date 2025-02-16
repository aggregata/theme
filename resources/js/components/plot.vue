<script setup lang="ts">
import { onMounted, ref, useHost } from 'vue';
import { observe } from '../utilities';
import { SystemRestart } from '@iconoir/vue';

const host = useHost();
const init = ref(false);

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

onMounted(() => {
    observe(host as HTMLElement, async (entry: any) => {
        if (init.value) return;

        if (entry.isIntersecting) {
            // @ts-ignore
            const Plotly = await import('plotly.js-dist');
            const file = await (await fetch(`/assets/plots/${props.src}.json`)).json();

            Plotly.newPlot(host, file, layout, config);
            init.value = true;
        }
    });
});
</script>

<template>
    <Transition appear>
        <div v-if="init">
            <slot />
        </div>
        <div v-else class="loading" title="Loading Plot…">
            <SystemRestart width="16" height="16" />
        </div>
    </Transition>
</template>

<style scoped>
@keyframes ping {
    75%,
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity var(--animation-duration);
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.loading {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
