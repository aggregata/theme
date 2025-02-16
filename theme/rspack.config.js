import { resolve } from 'path';

import rspack from '@rspack/core';

import { VueLoaderPlugin } from 'vue-loader';

import tailwindcss from 'tailwindcss';
import postcssImport from 'postcss-import';

export default (env, argv) => {
    return {
        devServer: {
            devMiddleware: {
                writeToDisk: true,
            },
        },

        entry: {
            globals: ['./resources/js/globals.ts', './resources/css/globals.scss'],
            post: ['./resources/js/post.ts'],
        },

        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        experimentalInlineMatchResource: true,
                        customElement: true,
                    },
                },
                {
                    test: /\.ts$/,
                    type: 'javascript/auto',
                    loader: 'builtin:swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                            },
                        },
                    },
                },
                {
                    test: /\.s?[ca]ss$/,
                    type: 'javascript/auto',
                    use: [
                        {
                            loader: rspack.CssExtractRspackPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [tailwindcss, postcssImport],
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                api: 'modern-compiler',
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|json|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },

        optimization: {
            minimizer: [
                new rspack.SwcJsMinimizerRspackPlugin(),
            ],
        },

        output: {
            filename: '[name].js',
            path: resolve(process.cwd(), 'assets'),
            clean: true,
        },

        plugins: [
            new rspack.DefinePlugin({
                __VUE_OPTIONS_API__: 'true',
                __VUE_PROD_DEVTOOLS__: 'false',
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
            }),

            new VueLoaderPlugin(),

            new rspack.CssExtractRspackPlugin({
                filename: '[name].css',
            }),

            new rspack.CopyRspackPlugin({
                patterns: [{ from: 'public/' }],
            }),
        ],

        resolve: {
            extensions: ['.ts', '.js', '.json'],
            alias: {
                '@': resolve(process.cwd()),
            },
        },

        watchOptions: {
            ignored: /assets/,
        },
    };
};
