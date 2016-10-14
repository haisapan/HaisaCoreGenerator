const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'antd',
    'lodash',
    'classNames',
    'moment',
    // 'jwt-decode',
   
];

module.exports = {
    output: {
        path: 'dist',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};

