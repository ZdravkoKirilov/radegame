import { BaseModel } from "./Base.model";

export type Team = BaseModel & Partial<{

}>

export type TeamList = {
    [key: string]: Team;
}