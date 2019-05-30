import { RenderFunction, ShouldUpdateCheck } from "../models";

export const Memo = <T>(original: RenderFunction, checker?: ShouldUpdateCheck): RenderFunction<T> & MemoRenderFunction => {
    const MemoComponent = original.bind({});
    MemoComponent.shouldUpdate = checker;
    MemoComponent.memo = true;
    MemoComponent.name = original.name || MemoComponent.name;
    return MemoComponent;
};

export type MemoRenderFunction = {
    shouldUpdate: ShouldUpdateCheck;
}