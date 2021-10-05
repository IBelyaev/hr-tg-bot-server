import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCn } from 'bem-react-classname';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';

import { UserDocument } from '../../server/users/models/users.model';
import UserTable from './ui/user-table';
import UserCreationWindow from './ui/user-creation-window';
import { getData } from '../ducks/users';
import { usersSelector } from '../ducks/users/selectors';

import './main-page.css';

const cn = createCn('main-page');

const MainPage: React.FunctionComponent<RouteProps> = React.memo(() => {
    const [isModalOpen, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        dispatch(getData());
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
            { users && <UserTable users={users} /> }
            <UserCreationWindow isOpen={isModalOpen} onModalOpen={handleCloseModal} />
        </div>
    );
});

export default MainPage;
