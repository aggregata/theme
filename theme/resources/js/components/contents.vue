<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { observe } from '../utilities';

const contents = ref<HTMLOListElement | null>(null);
const headlines = document.querySelectorAll('.rich-text > :is(h2, h3)');

onMounted(() => {
    const links = contents.value?.querySelectorAll('a');

    let active: Element | null | undefined = null;
    for (const headline of headlines) {
        const link = contents.value?.querySelector(`a[href="#${headline.id}"]`);
        observe(headline, (entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                if (active) {
                    active.classList.remove('visible');
                }
                link?.classList.add('visible');
                active = link;
            }
        });
    }
});
</script>

<template>
    <ol ref="contents">
        <li v-for="(headline, i) in headlines">
            <a :style="`--delay: ${i}; --indent: ${Number(headline.nodeName[1]) - 2}`" :href="`#${headline.id}`">
                &nbsp;{{ headline.textContent }}
            </a>
        </li>
    </ol>
</template>

<style scoped>
@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

ol {
    list-style-type: none;
    padding: unset;
    margin: unset;
}

a {
    position: relative;
    color: var(--color, var(--foreground-subtle));
    padding-left: 2.25rem;
    margin-left: calc(var(--indent, 0) * 0.75rem);
    text-decoration: none;
    font-weight: 500;
    animation: fade var(--animation-duration) calc(var(--delay, 0) * 37.5ms) both;
    transition:
        color var(--animation-duration),
        border-color var(--animation-duration);
    overflow: hidden;
    font-size: 0.875rem;
    line-height: 2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;

    &::before {
        position: absolute;
        top: 50%;
        content: '';
        display: inline-block;
        width: 0.75rem;
        height: 0.0625rem;
        left: 0;
        background-color: currentColor;
        transition:
            background-color var(--animation-duration),
            width var(--animation-duration);
    }

    &.visible {
        --color: var(--brand);

        &::before {
            width: 1.5rem;
        }
    }
}
</style>
