/**
 * Created by trojande on 8/24/17.
 */
module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/bin',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
};
