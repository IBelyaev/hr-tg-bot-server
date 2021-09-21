import express from 'express'

import UserModels, { UserDocument } from '../models/users.model';

const UserController = {
    create: (req: express.Request<null, null, UserDocument>, res: express.Response<Record<'id', string>>) => {
        UserModels
            .createUser(req.body)
            .then((result) => {
                res.status(200).send({id: result.id});
            });
    },
    list: (_req: express.Request, res: express.Response<UserDocument[]>) => {    
        UserModels
            .list()
            .then((result) => {
                res.status(200).send(result);
            });
    },
    getUser: (
        req: express.Request<unknown, unknown, unknown, Partial<Record<'userId', string>>>,
        res: express.Response<UserDocument | null>
    ) => {  
        const { userId = '' } = req.query;

        UserModels
            .getUser(userId)
            .then((result) => {
                res.status(200).send(result);
            }).catch((error) => {
                res.status(400).send(error);
            });
    },
    // delete: (req: express.Request, res: express.Response) => {    
    //     const { blog_id } = req.params;

    //     BlogModels
    //         .delete(blog_id)
    //         .then(() => {
    //             res.status(200).send('success');
    //         });
    // },
    // getBlog: (req: express.Request, res: express.Response) => {  
    //     const { blog_id } = req.query;

    //     BlogModels
    //         .getBlog(blog_id as string)
    //         .then((result) => {
    //             res.status(200).send(result);
    //         }).catch((error) => {
    //             res.status(400).send(error);
    //         });
    // },
    // update: (req: express.Request, res: express.Response) => {  
    //     const { blog_id } = req.params;
    //     const data = req.body;

    //     BlogModels
    //         .update(blog_id, data)
    //         .then((result) => {
    //             res.status(200).send(result);
    //         }).catch((error) => {
    //             res.status(400).send(error);
    //         });
    // },
};

export default UserController;
