import { BaseModel, WithBoard, WithStakes, WithKeywords, WithFrames } from "./Base.model";

export type Field = BaseModel & WithBoard  & WithStakes & WithKeywords & WithFrames;
