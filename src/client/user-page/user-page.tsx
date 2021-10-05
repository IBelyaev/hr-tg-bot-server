import React, { useEffect, useState } from 'react';
import { createCn } from 'bem-react-classname';
import { useParams, useHistory } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';

import { UserDocument } from '../../server/users/models/users.model';
import { getUser } from './async-fns';

import './user-page.css';

const cn = createCn('user-page');

const UserPage = () => {
    const { id = '' } = useParams<{id: string}>();
    const history = useHistory();
    const [user, setUser] = useState<UserDocument>();

    const handleClick = () => history.push(`/`);
    
    useEffect(() => {
        getUser(id).then(userData => setUser(userData.data));
    }, [id]);

    if (!user) {
        return null;
    }

    return (
        <div className={cn()}>
            <Typography.Title className={cn('title')} tag='h1' font='system'>
                Страница обратной связи по скринингу
            </Typography.Title>
            <div className={cn('row')}>Имя: {user.name}</div>
            <div className={cn('row')}>Фамилия: {user.surname}</div>
            <div className={cn('row')}>Прошел: {user.isPassedScreening ? 'Да' : 'Нет'}</div>
            <div className={cn('row')}>Дата начала скрининга: {user.startDate}</div>
            <div className={cn('row')}>Дата завершения скрининга: {user.finishDate}</div>
            <div className={cn('row')}>Кол-во баллов: {user.goals}</div>
            <div className={cn('row')}>Ссылка на tg bot: https://t.me/HRAlfaBot?start={user._id}</div>
            {/* Стоит этим заняться как выкатим пробную версию */}
            {/* <div className={cn('row')}>Фитбек:</div> */}

            <Button onClick={handleClick} view='primary' className={cn('row')}>
                Вернуться на главную
            </Button>
        </div>
    );
}

export default UserPage;
