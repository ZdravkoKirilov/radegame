import { Nominal } from 'simplytyped';

import { BaseModel } from "./Base.model";

export type SoundId = Nominal<string, 'SoundId'>;

export type Sound = BaseModel<SoundId> & Partial<{
    file: string;
}>