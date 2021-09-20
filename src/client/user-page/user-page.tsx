import React from 'react';
import { createCn } from 'bem-react-classname';
import { useParams } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';

import './user-page.css';

const cn = createCn('user-page');

const UserPage = () => {
    const { id } = useParams<{id: string}>();

    return (
        <div className={cn()}>
            <Typography.Title className={cn('title')} tag='h1' font='system'>
                Страница обратной связи по скринингу
            </Typography.Title>
            <div className={cn('row')}>Имя:</div>
            <div className={cn('row')}>Фамилия:</div>
            <div className={cn('row')}>Прошел:</div>
            <div className={cn('row')}>Дата начала скрининга:</div>
            <div className={cn('row')}>Дата завершения скрининга:</div>
            <div className={cn('row')}>Кол-во баллов:</div>
            <div className={cn('row')}>Фитбек:</div>
        </div>
    )
}

export default UserPage;
