<script setup lang="ts">
import { useHost } from 'vue';

const host = useHost();
</script>

<template>
    <div class="placement">
        <div class="placement-disclaimer">
            <span>Advertisement</span>
            <span>&bullet;</span>
            <a href="#/portal/signup" role="button">Get Aggregata+</a>
        </div>
        <slot>
            <div class="placement-fallback">
                <div class="placement-fallback-inner">
                    Please consider supporting us by either enabling adverts or
                    <a href="#/portal/signup">becoming a member</a>
                </div>
            </div>
        </slot>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
}

.placement {
    border-radius: 0.5rem;
    border: 0.0625rem solid var(--border);
    padding: 0.75rem;
    position: relative;

    &-disclaimer {
        background: var(--background);
        display: flex;
        font-size: 0.75rem;
        font-weight: 500;
        gap: 0.5rem;
        left: 50%;
        line-height: 1.5rem;
        padding-inline: 0.5rem;
        position: absolute;
        top: -0.75rem;
        transform: translateX(-50%);
        white-space: nowrap;
    }

    &-fallback {
        background-image: repeating-linear-gradient(
            315deg,
            var(--border) 0,
            var(--border) 0.0625rem,
            transparent 0,
            transparent 50%
        );
        background-size: 0.5rem 0.5rem;
        border: 0.0625rem solid var(--border);
        border-radius: 0.25rem;
        padding: 0.75rem;

        &-inner {
            background: var(--background);
            border: 0.0625rem solid var(--border);
            font-size: 0.75rem;
            padding: 0.75rem;
            text-align: center;
        }
    }
}
</style>
