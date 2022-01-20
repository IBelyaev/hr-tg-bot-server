import { Scenes } from 'telegraf';

import { AllContext } from '../types';
import { SceneNames } from './types';

const { BaseScene } = Scenes;
const finish = new BaseScene<AllContext>(SceneNames.finish);

finish.enter((ctx) => {
    ctx.reply(
       'Ты прошел скрининг! Нам нужно немного времени чтобы с тобой связаться! ' +
       'HR вернется к тебе с обратной связью)'
    );
});

export default finish;
