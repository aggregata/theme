import type { Config } from 'tailwindcss';

import typography from '@tailwindcss/typography';

const mix = (name: string) => {
    return `rgb(from var(${name}) r g b / <alpha-value>)`;
};

export default <Partial<Config>>{
    content: ['*.hbs', 'members/*.hbs', 'routes/*.hbs', 'partials/*.hbs'],
    theme: {
        extend: {
            screens: {
                md: '48rem',
                lg: '75rem',
                xl: '93rem',
            },
            spacing: {
                18: '4.5rem',
                30: '7.5rem',
            },
            fontSize: {
                '3xs': ['.625rem', '1rem'],
                '2xs': ['.75rem', '1rem'],
                xs: ['.8125rem', '1rem'],
                sm: ['.875rem', '1.5rem'],
                md: '1rem',
                h6: ['1.25rem', 1.25],
                h5: ['1.625rem', 1.25],
                h4: ['2.125rem', 1.25],
                h3: ['2.75rem', 1.25],
                h2: ['3.5rem', 1.25],
                h1: ['4.375rem', 1.25],
            },
            gridTemplateColumns: {
                post: '[left] minmax(auto, 18rem) [center] 12fr [right] minmax(auto, 18rem)',
            },
            borderWidth: {
                DEFAULT: 'var(--border-width)',
            },
            colors: {
                background: {
                    DEFAULT: mix('--background'),
                    subtle: mix('--background-subtle'),
                },
                foreground: {
                    DEFAULT: mix('--foreground'),
                    subtle: mix('--foreground-subtle'),
                },
                neutral: {
                    DEFAULT: mix('--neutral'),
                    subtle: mix('--neutral-subtle'),
                },
                brand: {
                    bold: mix('--brand-bold'),
                    DEFAULT: mix('--brand'),
                    subtle: mix('--brand-subtle'),
                },
                informative: {
                    bold: mix('--informative-bold'),
                    DEFAULT: mix('--informative'),
                    subtle: mix('--informative-subtle'),
                },
                successful: {
                    bold: mix('--successful-bold'),
                    DEFAULT: mix('--successful'),
                    subtle: mix('--successful-subtle'),
                },
                cautionary: {
                    bold: mix('--cautionary-bold'),
                    DEFAULT: mix('--cautionary'),
                    subtle: mix('--cautionary-subtle'),
                },
                destructive: {
                    bold: mix('--destructive-bold'),
                    DEFAULT: mix('--destructive'),
                    subtle: mix('--destructive-subtle'),
                },
                border: mix('--border'),
                input: mix('--input'),
                ring: mix('--ring'),
            },
            lineHeight: {
                12: '3rem',
            },
            typography: () => ({
                brand: {
                    css: {
                        '--tw-prose-body': 'var(--foreground-subtle)',
                        '--tw-prose-headings': 'var(--foreground)',
                        '--tw-prose-lead': 'var(--foreground-subtle)',
                        '--tw-prose-links': 'var(--brand)',
                        '--tw-prose-bold': 'var(--foreground)',
                        '--tw-prose-counters': 'var(--brand)',
                        '--tw-prose-bullets': 'var(--brand)',
                        '--tw-prose-hr': 'var(--border)',
                        '--tw-prose-quotes': 'var(--foreground)',
                        '--tw-prose-quote-borders': 'var(--brand)',
                        '--tw-prose-captions': 'var(--foreground-subtle)',
                        '--tw-prose-kbd': 'var(--foreground)',
                        '--tw-prose-kbd-shadows': 'from var(--foreground) r g b',
                        '--tw-prose-code': 'var(--foreground)',
                        '--tw-prose-pre-code': 'var(--foreground)',
                        '--tw-prose-pre-bg': 'var(--background-subtle)',
                        '--tw-prose-th-borders': 'var(--border)',
                        '--tw-prose-td-borders': 'var(--border)',
                    },
                },
            }),
        },
    },
    plugins: [typography],
};
