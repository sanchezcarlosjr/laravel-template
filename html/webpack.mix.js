const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.options({
    resourceRoot: process.env.VUE_PUBLIC_PATH,
});

mix.webpackConfig(webpack => {
    return {
        output: {
            publicPath: process.env.VUE_PUBLIC_PATH
        },
        resolve: {
            extensions: [".vue", ".ts"],
            alias: {
                '@shared': path.resolve(__dirname, 'resources/js/@shared')
            }
        },
        plugins: [
            new webpack.EnvironmentPlugin (
                {
                    BASE_URL: process.env.VUE_PUBLIC_PATH
                }
            )
        ]
    };
});

mix.ts('resources/js/app.ts', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
