import { Scenes } from 'telegraf';

import { AllContext } from '../types';
import { SceneNames } from './types';

const { BaseScene } = Scenes;
const authError = new BaseScene<AllContext>(SceneNames.authError);

authError.enter((ctx) => {
    ctx.reply(
       'Кажется что-то не так с твоим url, попробуй еще раз перейти по ' +
       'нему из браузера, если не получиться то обратись к @igoralfalab'
    );
});

export default authError;