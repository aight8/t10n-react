/// <reference path="./webpack.config.d.ts" />

import * as path from 'path'
import * as webpack from 'webpack'
import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader'
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import * as WebpackHtmlPlugin from 'webpack-html-plugin'
import * as ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api/'

/**************
 * Environment
 *************/
type EnvironmentType = 'production' | 'development'
const ENV: EnvironmentType = process.env.NODE_ENV || 'development'
if (!['production', 'development'].includes(ENV)) {
    throw new Error('NODE_ENV must be either "production", "development" or not defined ("development" as default)')
}
console.log(`Environment: ${ENV}`)
const IS_PROD = ENV === 'production'
const IS_DEV = ENV === 'development'

const publicPath = ''

/********************
 * Typescript config
 *******************/
const awesomeTypescriptLoaderOptions = {
    useBabel: true
}

/*****************
 * Basic Plugins
 ****************/

const plugins = [
    new webpack.ProgressPlugin(),
    new CheckerPlugin(),
    new TsConfigPathsPlugin(),
    new WebpackHtmlPlugin({
        inject: true,
        cache: false, // rebuild if using webpack-dev-server
        template: 'assets/index.template.ejs',
        minify: false
    }),
    new webpack.EnvironmentPlugin({
        API_BASE_URL: process.env.API_BASE_URL || DEFAULT_API_BASE_URL
    })
    //new FriendlyErrorsWebpackPlugin()
]

if (IS_PROD) {
    plugins.push(new webpack.NoEmitOnErrorsPlugin())
}

if (IS_DEV) {
    plugins.push(new webpack.NamedModulesPlugin())
}

/**************
 * CSS Related
 *************/
let cssLoaders: webpack.Loader | webpack.Loader[] = [
    'css-loader'
]
let sassLoaders: webpack.Loader | webpack.Loader[] = [
    {
        loader: 'css-loader',
        options: {
            sourceMap: true,
            importLoaders: 1
        }
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true
        }
    }
]
if (IS_PROD) {
    const extractCSS = new ExtractTextWebpackPlugin('style.css')
    cssLoaders = extractCSS.extract({
        fallback: 'style-loader',
        use: cssLoaders
    })
    sassLoaders = extractCSS.extract({
        fallback: 'style-loader',
        use: sassLoaders
    })
    plugins.push(extractCSS)
} else {
    cssLoaders.unshift('style-loader')
    sassLoaders.unshift('style-loader')
}

/*****************
 * Configuration
 ****************/
const configuration: webpack.Configuration = {
    bail: IS_PROD,
    devtool: 'source-map',
    context: __dirname,
    entry: {
        main: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.resolve('src/index.tsx')
        ]
    },
    output: {
        path: path.resolve('build', (IS_PROD ? 'prod' : 'dev')),
        pathinfo: IS_DEV,
        filename: '[name].bundle.js',
        publicPath
    },
    plugins,
    resolve: {
        alias: {
            api: path.resolve('src', 'api'),
            components: path.resolve('src', 'components'),
            interface: path.resolve('src', 'interface')
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        modules: [
            'node_modules',
            path.resolve('src')
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: [path.resolve('src')]
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: awesomeTypescriptLoaderOptions,
                include: [path.resolve('src')]
            },
            { test: /\.css$/, use: cssLoaders },
            { test: /\.scss$/, use: sassLoaders }
        ]
    },
    devServer: {
        contentBase: path.resolve('public'),
        publicPath,
        port: 6969,
        overlay: true
    }
}

export default configuration
