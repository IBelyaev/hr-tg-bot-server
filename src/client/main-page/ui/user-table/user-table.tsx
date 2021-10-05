import React from 'react';
import { createCn } from 'bem-react-classname';
import { useHistory } from 'react-router-dom';

import { UserDocument } from '../../../../server/users/models/users.model';

import './user-table.css';

type Props = {
    users: UserDocument[];
};

type UserTabProps = {
    name: string;
    surname: string;
    id: string;
};

const cn = createCn('user-table');

const UserTab = ({name, id, surname}: UserTabProps) => {
    const history = useHistory();
    const handleClick = () => history.push(`/user-info/${id}`);

    return (
        <div onClick={handleClick} className={cn('tab-wrapper')}>
            {name} {surname}
        </div>
    );
}

const UserTable = ({users = []}: Props) => {
    return (
        <div className={cn()}>
            {users.map(({name, surname, _id: id}) => (
                <UserTab name={name} surname={surname} id={id} />
            ))}
        </div>
    );
}

export default UserTable;
