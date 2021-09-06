import { Express } from 'express';
import UserModels from './controllers/users.controller';

export default function (app: Express) {
    app.post('/users', [
        UserModels.create
    ])

    app.get('/users', [
        UserModels.list
    ])

    // app.get('/users/:userId', [
    //     // BlogController.getBlog
    // ])
};
