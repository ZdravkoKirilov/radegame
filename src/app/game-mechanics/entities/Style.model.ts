import { Nominal } from 'simplytyped';

import { RzStyles } from "@app/render-kit";

import { BaseModel, WithModule } from "./Base.model";

export type StyleId = Nominal<string, 'StyleId'>;

export type Style = BaseModel<StyleId> & RzStyles & WithModule;