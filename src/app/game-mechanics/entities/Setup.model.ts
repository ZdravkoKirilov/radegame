import { BaseModel } from "./Base.model";
import { Omit } from "@app/shared";

export type Setup = BaseModel & {
    min_players: number;
    max_players: number;
    recommended_age: number;
};


// can be applied to only some of the entities. For example - action / condition / choice / token dont need it, since they are 
// only ever obtained via Source - the setup option can be placed there