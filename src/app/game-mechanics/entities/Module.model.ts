import { BaseModel, WithBoard } from './Base.model';
import { Omit } from '@app/shared';
import { ExpressionFunc } from './Expression.model';
import { Widget } from './Widget.model';

export type Module = BaseModel & WithBoard & Partial<{
    phases: Phase[]; // Phase[]

    preload: string;
    load_done: string;
    loader: number;
}>;

export type RuntimeModule = Module & Omit<Module, 'preload' | 'load_done'> & {
    preload: ExpressionFunc<void>;
    load_done: ExpressionFunc<boolean>;
    loader: Widget;
    board: Widget;
};

export type Phase = Partial<{
    id: number;
    owner: number;
    
    name: string;
    description: string;
    keywords: string;

    done: string; // Expression
    image: number; // ImageAsset
}>;