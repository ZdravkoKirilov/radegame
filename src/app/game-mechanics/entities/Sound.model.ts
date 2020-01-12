import { BaseModel } from "./Base.model"

export type Sound = BaseModel & Partial<{
    file: string;
}>