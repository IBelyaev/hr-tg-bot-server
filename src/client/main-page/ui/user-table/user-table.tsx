import React from 'react';
import { createCn } from 'bem-react-classname';

import { UserDocument } from '../../../../server/users/models/users.model';

import './user-table.css';

type Props = {
    users: UserDocument[];
};

const cn = createCn('user-table');

const UserTable = ({users = []}: Props) => {
    return (
        <div className={cn()}>
            <div className={cn('row')}>
                <div>Имя</div>
                <div>Фамилия</div>
                <div>Прошел скрининг</div>
                <div>Ссылка на бот</div>
            </div>
            {users.map(({name, surname, isPassedScreening, _id }) => (
                <div className={cn('row')}>
                    <div>{name}</div>
                    <div>{surname}</div>
                    <div>{isPassedScreening ? 'да' : 'нет'}</div>
                    <div>https://t.me/HRAlfaBot?start={_id}</div>
                </div>
            ))}
        </div>
    );
}

export default UserTable;
