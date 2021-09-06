import { Express } from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import ReactDomServer from 'react-dom/server';
import React from 'react';
import webpack from 'webpack';

import AppHtml from '../../../client/components/app-html';
import Root from '../../../client/root';
import config from '../../../../webpack.dev.config';

const compiler = webpack(config);
const appMarkup = ReactDomServer.renderToString(<Root />) ;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const jsFiles = IS_PRODUCTION ? ['main.js', 'vendor.js'] : ['main.js'];
const cssFiles = IS_PRODUCTION ? ['vendor.css', 'main.css'] : ['main.css'];

const html = ReactDomServer.renderToStaticMarkup(
    <AppHtml
        styleNames={cssFiles}
        scriptNames={jsFiles}
    >
        {appMarkup}
    </AppHtml>
);

export default function (app: Express) {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));
    
    app.use(webpackHotMiddleware(compiler));
    
    app.get('/', (_req, res) => {
        res.send(`<!docktype html>${html}`);
    });
};
