import axios from 'axios';

import { UserDocument } from '../../server/users/models/users.model';

const UserServiceEndpoint = 'http://localhost:8000/user';

export async function getUser(userId: string) {
    return axios.get<UserDocument>(
        `${UserServiceEndpoint}/?userId=${userId}`,
    );
};
