//entry -> output
//https://webpack.js.org/#bundle-it
const path = require('path');
const webpack = require('webpack');
//https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const publicPath = path.join(__dirname, 'public', 'dist');

//https://www.npmjs.com/package/cross-env
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//https://www.npmjs.com/package/dotenv

if (env === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (env === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

//with this we can export the module and can be used in another file
module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });
    const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: publicPath,
            filename: 'bundle.js'
        },
        //https://webpack.js.org/loaders/#transpiling
        //https://webpack.js.org/loaders/babel-loader/
        //loader
        //import babel to convert from React to ES6
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            //when webpack detects css files run a module
            //https://www.npmjs.com/package/css-loader
            {
                test: /\.s?css$/,
                //extract all scss or css and bundle in styles.css                
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]

            }]
        },
        plugins: [
            CSSExtract,
            new MomentLocalesPlugin({
                localesToKeep: ['es', 'en']
            }),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
            })
        ],
        //set sourcemap to debug where in the files were an error and not show just bundle.js line 22xxx
        //https://webpack.js.org/configuration/devtool/
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        //https://webpack.js.org/configuration/dev-server/
        //replacing for live-server
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };

};



