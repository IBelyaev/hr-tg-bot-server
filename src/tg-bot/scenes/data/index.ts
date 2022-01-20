type AnswerButton = {
    id: string;
    text: string;
    isRight: boolean;
};

type Question = {
    id: string;
    text: string;
    buttons: AnswerButton[];
};

const MOCK_QUESTIONS: Question[] = [
    {
        id: '1',
        text: 'Сколько будет 1 + 1',
        buttons: [
            {
                text: '2',
                id: '1_1',
                isRight: true,
            },
            {
                text: '69',
                id: '1_1',
                isRight: false,
            },
            {
                text: 'Паша техник',
                id: '1_1',
                isRight: false,
            },
            {
                text: 'Нолик',
                id: '1_1',
                isRight: false,
            }
        ],
    },
    {
        id: '2',
        text: 'Игорян - это',
        buttons: [
            {
                text: 'Калужский парень',
                id: '1_1',
                isRight: false,
            },
            {
                text: 'Ловушкиш джокера',
                id: '1_1',
                isRight: true,
            }
        ],
    },
    {
        id: '3',
        text: 'Филипок - это',
        buttons: [
            {
                text: 'Произведение',
                id: '1_1',
                isRight: true,
            },
            {
                text: 'Филип у которого все Ок',
                id: '1_1',
                isRight: false,
            },
            {
                text: 'Все варианты не верные',
                id: '1_1',
                isRight: false,
            }
        ],
    },
    {
        id: '4',
        text: ' лол кек - это',
        buttons: [
            {
                text: 'чебурек',
                id: '1_1',
                isRight: true,
            },
            {
                text: 'человек',
                id: '1_1',
                isRight: false,
            },
            {
                text: 'полковник на белом коне',
                id: '1_1',
                isRight: false,
            }
        ],
    },
    {
        id: '5',
        text: 'Что такое мемная пака?',
        buttons: [
            {
                text: 'Апчихба!',
                id: '1_1',
                isRight: true,
            },
            {
                text: 'человек',
                id: '1_1',
                isRight: false,
            },
            {
                text: 'полковник на белом коне',
                id: '1_1',
                isRight: false,
            }
        ],
    }
];

export default MOCK_QUESTIONS;
