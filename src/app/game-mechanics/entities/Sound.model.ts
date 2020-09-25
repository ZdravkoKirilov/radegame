import { Nominal } from 'simplytyped';

import { BaseModel, WithModule } from "./Base.model";

export type SoundId = Nominal<string, 'SoundId'>;

export type Sound = BaseModel<SoundId> & WithModule & Partial<{
    file: string;
}>