import { SceneContext } from 'telegraf/typings/scenes';
import { Context } from 'telegraf';

export type StartPayload = {
    startPayload: string;
};

export type AllContext = Context & SceneContext;
