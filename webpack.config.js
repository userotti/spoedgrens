const HtmlWebpackPlugin = require('html-webpack-plugin');
require('awesome-typescript-loader');
var path = require('path');

module.exports = {
        entry: './src/index.ts',
        output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'public'),

        },

        // Currently we need to add '.ts' to the resolve.extensions array.
        resolve: {
                extensions: ['.ts', '.tsx', '.js', '.jsx']
        },

        // Source maps support ('inline-source-map' also works)
        devtool: 'source-map',

        module: {
                loaders: [
                        { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader'},
                        { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader'},
                        {
                                test: /\.tsx?$/,
                                loader: 'awesome-typescript-loader'
                        }
                ]
        },

        plugins: [
                new HtmlWebpackPlugin({
                        template: 'src/templates/template.ejs', // Load a custom template (ejs by default see the FAQ for details)
                })
        ]
};