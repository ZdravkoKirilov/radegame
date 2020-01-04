import { RenderFunction, RzElement } from "@app/render-kit";
import { withDispatcher, InjectedDispatcher } from "app/game-mechanics/hocs";

export type DataLoaderProps = {
    preload: Function;
    load_done: Function;
    fallback: RzElement;
    children?: RzElement;
} & InjectedDispatcher;

const dataLoader: RenderFunction<DataLoaderProps> = ({ preload, load_done, fallback, children, dispatcher }) => {
    if (preload && load_done && !load_done()) {
        const actions = preload();
        dispatcher.dispatch(actions, false);
        return fallback;
    }
    return children;
};

export const DataLoader = withDispatcher<DataLoaderProps>(dataLoader);