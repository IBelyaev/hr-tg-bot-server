const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = () => {
  return ({
    entry: {
      server: './src/server/server.tsx',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals({
      allowlist: [ /^@alfalab\/core-components/ ],
      modulesFromFile: true,
  })],
    module: {
      rules: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
            }
        },
        {
          test: /\.css$/,
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: './postcss.config.js',
                },
              }
          }
          ]
        },
      ]
    }
  })
}
