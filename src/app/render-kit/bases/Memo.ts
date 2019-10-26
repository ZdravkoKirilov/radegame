import { RenderFunction, ShouldUpdateCheck, RzElementProps } from "../models";

export const Memo = <T>(original: RenderFunction<T>, checker?: ShouldUpdateCheck<T>): MemoRenderFunction<T> => {
    // const MemoComponent = memoize(original) as any;
    const MemoComponent = original as any;
    MemoComponent.shouldUpdate = checker;
    MemoComponent.memo = true;
    return MemoComponent as MemoRenderFunction<T>;
};

export const CurriedMemo = <T>(checker?: ShouldUpdateCheck<T>) => (original: RenderFunction<T>) => Memo(original, checker);

export type MemoRenderFunction<T extends RzElementProps = {}> = RenderFunction<T> & {
    shouldUpdate: ShouldUpdateCheck;
    memo: true;
}