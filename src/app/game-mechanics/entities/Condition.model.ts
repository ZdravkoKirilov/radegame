import { BaseModel, WithTemplate, WithFrames } from './Base.model';
import { Omit } from '@app/shared';
import { ExpressionFunc } from './Expression.model';
import { RuntimeStage } from './Stage.model';

export type Condition = BaseModel & WithTemplate & WithFrames & Partial<{
    clause: string;
    passes: string;
    fails: string;
}>;

export type RuntimeCondition = Omit<Condition, 'clause' | 'passes' | 'fails' | 'template'> & {
    clause: ExpressionFunc;
    passes: ExpressionFunc;
    fails: ExpressionFunc;
    template: RuntimeStage;
};






