const path = require('path');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    output: {
        filename: 'script.js'
    },
    externals: {
        jQuery: 'jQuery'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_moules/
            }
        ]
    },
    plugins: [
        new DependencyExtractionWebpackPlugin({
            injectPolyfill: true
        })
    ],
    resolveLoader: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', 'jsx', 'js'],
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    }
}
