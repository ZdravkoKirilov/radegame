import { BaseModel } from "./Base.model";
import { Omit } from "@app/shared";
import { ExpressionFunc } from "./Expression.model";

export type Phase = BaseModel & Partial<{
    done: string;
}>;

export type RuntimePhase = Omit<Phase, 'done'> & {
    done: ExpressionFunc;
};