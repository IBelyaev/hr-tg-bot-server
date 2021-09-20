import axios from 'axios';

type CreateUsersBody = Record<'name' | 'surname', string>;

const UserServiceEndpoint = 'http://localhost:8000/users';

export async function createUsers(body: CreateUsersBody) {
    return axios.post<string>(
        UserServiceEndpoint,
        body,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
};

export async function getUsers() {
    return axios.get(UserServiceEndpoint);
};
