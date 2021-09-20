import React, { useState } from 'react';
import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
import { Input } from '@alfalab/core-components/input';

import { createUsers } from '../../async-fns';

type Props = {
    isOpen: boolean;
    onModalOpen: () => void;
};

const UserCreationWindow = ({isOpen, onModalOpen}: Props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const changeName = (_event: React.ChangeEvent<HTMLInputElement>, payload: {
        value: string;
    }) => setName(payload.value);

    const changeSurname = (_event: React.ChangeEvent<HTMLInputElement>, payload: {
        value: string;
    }) => setSurname(payload.value);

    const onSubmitBtn = async () => {
        await createUsers({name, surname});

        onModalOpen();
    };

    return (
        <div>
            <ModalDesktop open={isOpen} onClose={onModalOpen} size='m'>
            <ModalDesktop.Header />
                <ModalDesktop.Content>
                    <Typography.Title tag='div' view='small'>
                        Информация о новом кандидате
                    </Typography.Title>
                    <br />
                    <Input label="Имя" block={true} onChange={changeName} name={name} />
                    <br />
                    <Input label="Фамилия" block={true} onChange={changeSurname} name={surname} />
                    <br />
                </ModalDesktop.Content>
                <ModalDesktop.Footer>
                    <Button view='primary' size='s' onClick={onSubmitBtn}>
                        Создать новый бот
                    </Button>
                </ModalDesktop.Footer>
            </ModalDesktop>
        </div>
    );
}

export default UserCreationWindow;
