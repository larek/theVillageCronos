module.exports = {
    entry: ['./src/index.jsx'],
    output: {
        filename: './web/js/bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
}
