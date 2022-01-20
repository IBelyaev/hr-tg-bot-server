import { Scenes, Markup } from 'telegraf';
import { CallbackQuery } from 'typegram/callback';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

import User, { UserDocument } from '../models';
import { AllContext } from '../types';
import MOCK_QUESTIONS from './data';
import { SceneNames } from './types';

type QuestionArgs = {
    text: string;
    answerButtons: Markup.Markup<InlineKeyboardMarkup>;
};

const { button: { callback: callbackButton }, inlineKeyboard } = Markup;
const { BaseScene } = Scenes;
const quiz = new BaseScene<AllContext>(SceneNames.quiz);

let QUESTION_TIMEOUT: NodeJS.Timeout | null = null;
let SECONDS_INTERVAL: NodeJS.Timeout | null = null;

quiz.enter((ctx) => {
    sendQuizAnswer(ctx);
});

quiz.action('next_question', (ctx) => {
    sendQuizAnswer(ctx);
});

quiz.on('callback_query', async (ctx) => {
    const { callback_query } = ctx.update;

    if (isQuizSate(ctx.session.__scenes.state) && ctx.session.__scenes.state.currentQuestion < MOCK_QUESTIONS.length) {
        await setNextQuestion(ctx);

        if (isCallbackHasData(callback_query) && isQuizSate(ctx.session.__scenes.state) && callback_query.data === 'sended_right_answer') {
            const { _id } = ctx.session.__scenes.state;
            const CurrentUser = await User.findOne({ _id });
            
            if (CurrentUser) {
                CurrentUser.goals = CurrentUser.goals + 1;
    
                await CurrentUser.save();
            }
        }
    
        await sendQuizAnswer(ctx);
    }
});

export default quiz;

async function sendQuizAnswer(ctx: AllContext): Promise<void> {
    clearAllTimers();

    if (isQuizSate(ctx.session.__scenes.state)) {
        if (ctx.session.__scenes.state.currentQuestion >= MOCK_QUESTIONS.length) {
            await changedUserBeforeFinis(ctx);

            await ctx.scene.enter(SceneNames.finish);
        } else {
            const { text, answerButtons } = getQuestionArgs(ctx.session.__scenes.state.currentQuestion, ctx);
    
            setActionToInterval(() => {
                sendTimeoutMessage(ctx);
            });
    
            await ctx.reply(text, answerButtons);
            
            await sendTimerForAnswer(ctx);
        }
    }
}

async function sendTimerForAnswer(ctx: AllContext) {
    let seconds = 60;
    const stopwatchNode = await ctx.reply('Времени на вопрос ' + seconds);
    const ONE_SECOND = 1000;

    SECONDS_INTERVAL = setInterval(() => {
        seconds -= 1;

        if (seconds >= 0) {
            ctx.telegram.editMessageText(
                stopwatchNode.chat.id,
                stopwatchNode.message_id,
                undefined,
                'Времени на вопрос ' + (seconds >= 10 ? seconds : `0${seconds}`),
            );
        }
    }, ONE_SECOND)
}

function clearAllTimers() {
    if (QUESTION_TIMEOUT) {
        clearTimeout(QUESTION_TIMEOUT);
    };

    if (SECONDS_INTERVAL) {
        clearInterval(SECONDS_INTERVAL);
    };
}

function getQuestionArgs(questionIndex: number, ctx: AllContext): QuestionArgs {
    return {
        text: MOCK_QUESTIONS[questionIndex].text,
        answerButtons: getQuestionsButton(questionIndex, ctx),
    }
}

function getQuestionsButton(questionIndex: number, _ctx: AllContext): Markup.Markup<InlineKeyboardMarkup> {
    const buttons = MOCK_QUESTIONS[questionIndex].buttons.map(({text, isRight}) => (
        [callbackButton(text, isRight ? 'sended_right_answer' : 'sended_wrong_answer')]
    ));

    return inlineKeyboard(buttons);
}

async function sendTimeoutMessage(ctx: AllContext): Promise<void> {
    await setNextQuestion(ctx);

    await ctx.reply(
        (
            'Прости но время вышло(((((((( ' +
            'Чтобы перейти к следующему вопросу нажми кнопку далее'
        ),
        inlineKeyboard([callbackButton('Перейти к след вопросу', 'next_question')])
    )
}

async function setNextQuestion(ctx: AllContext): Promise<void> {
    if (isQuizSate(ctx.session.__scenes.state)) {
        const { _id  } = ctx.session.__scenes.state;
        const CurrentUser = await User.findOne({ _id });

        if (CurrentUser) {
            CurrentUser.currentQuestion = CurrentUser.currentQuestion + 1;

            await CurrentUser.save();
    
            ctx.session.__scenes.state.currentQuestion = ctx.session.__scenes.state.currentQuestion + 1;
        }
    }
}

function setActionToInterval(callback: (args: unknown) => void): void {
    QUESTION_TIMEOUT = setTimeout(callback, 60000);
}

function isCallbackHasData(callbackQuery: CallbackQuery): callbackQuery is CallbackQuery.DataCallbackQuery {
    if (callbackQuery.hasOwnProperty('data'))  {
        return true;
    }

    return false;
}

function isQuizSate(state?: object): state is UserDocument {
    if (state &&
        state.hasOwnProperty('surname') &&
        state.hasOwnProperty('name') &&
        state.hasOwnProperty('currentQuestion') &&
        state.hasOwnProperty('isPassedScreening') &&
        state.hasOwnProperty('goals')
    ) {
        return true;
    }

    return false;
}

async function changedUserBeforeFinis(ctx: AllContext) {
    if (isQuizSate(ctx.session.__scenes.state)) {
        const LOCALE_DATA_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'} as const;
        const DATE_COUNTRY = 'ru-RU';

        const { _id } = ctx.session.__scenes.state;
        const CurrentUser = await User.findOne({ _id });

        if (CurrentUser) {
            const date = new Date();
            const finishDate = date.toLocaleDateString(DATE_COUNTRY, LOCALE_DATA_OPTIONS) + ' ' + date.toLocaleTimeString(DATE_COUNTRY);
    
            CurrentUser.isPassedScreening = true;
            CurrentUser.finishDate = finishDate;
    
            await CurrentUser.save();
        }
    }
}
