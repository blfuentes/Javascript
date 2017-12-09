var path = require('path');

module.exports = {
    entry: {
        site: [
            './src/js/site.js',
            './src/js/App.ts',
            './src/js/index.ts'
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'wwwroot/dist/')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    target: 'node'
};