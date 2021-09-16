import React, { useState, useEffect } from 'react';
import { createCn } from 'bem-react-classname';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';

import { UserDocument } from '../../server/users/models/users.model';
import { getUsers } from './async-fns';
import UserTable from './ui/user-table';
import UserCreationWindow from './ui/user-creation-window';

import './app.css';

const cn = createCn('app');

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
            <UserCreationWindow isOpen={isModalOpen} onModalOpen={handleCloseModal} />
        </div>
    );
};

export default App;
