import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createCn } from 'bem-react-classname';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';

import { UserDocument } from '../../server/users/models/users.model';
import UserTable from './ui/user-table';

import './app.css';

const cn = createCn('app');

async function getUsers() {
    return axios.get<UserDocument[]>('http://localhost:8000/users');
}

const App = () => {
    const [isModalOpen, setOpenModal] = useState(false);
    const [userList, setUserList] = useState<UserDocument[] | null>(null);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        getUsers().then(({data}) => {
            setUserList(data);
        })
    }, [])

    return (
        <div className={cn()}>
            <Typography.Title tag='h1' font='system'>
                Таблица Скринингов
            </Typography.Title>
            <Button
                view='primary'
                size='s'
                className={cn('create-btn')}
                onClick={handleOpenModal}
            >
                Новый скрининг
            </Button>
            { userList && <UserTable users={userList} /> }
        </div>
    );
};

export default App;
