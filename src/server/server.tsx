import path from 'path';
import bodyParser from 'body-parser';
import express, { RequestHandler } from 'express';
// import BlogsRoutesConfig from './blogs/routes.config';
import UsersRoutesConfig from './users/routes.config';
import SSRConfig from '../server/common/ssr/config';

const PORT = process.env.PORT || 8000;
const app = express();
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json() as RequestHandler);

if (IS_PRODUCTION) {
    app.use(express.static(path.join(__dirname)));
}

UsersRoutesConfig(app);

SSRConfig(app);

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
});
