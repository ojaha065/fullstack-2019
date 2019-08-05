const path = require("path");

const config = {
    entry: [
        "@babel/polyfill",
        "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname,"build"),
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]
                }
            }
        ]
    }
};

module.exports = config;