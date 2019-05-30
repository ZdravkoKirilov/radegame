import { RenderFunction, ShouldUpdateCheck, RzElementProps } from "../models";
import { memoize } from 'lodash';

export const Memo = <T>(original: RenderFunction, checker?: ShouldUpdateCheck): MemoRenderFunction => {
    const MemoComponent = memoize(original) as any;
    MemoComponent.shouldUpdate = checker;
    MemoComponent.memo = true;
    MemoComponent.name = original.name || MemoComponent.name;
    return MemoComponent;
};

export type MemoRenderFunction<T extends RzElementProps = {}> = RenderFunction<T> & {
    shouldUpdate: ShouldUpdateCheck;
    memo: true;
}