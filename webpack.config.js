module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: './web/js/bundle.js'
    },
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
