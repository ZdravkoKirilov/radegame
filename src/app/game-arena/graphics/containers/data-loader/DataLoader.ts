import { RenderFunction, RzElement } from "@app/render-kit";
import { injectDispatcher, InjectedDispatcher } from "../../../hocs";

export type DataLoaderProps = {
    preload: Function;
    load_done: Function;
    fallback: RzElement;
    children?: RzElement;
} & InjectedDispatcher;

const dataLoader: RenderFunction<DataLoaderProps> = ({ preload, load_done, fallback, children, dispatcher }, { useEffect }) => {
    useEffect(() => {
        if (preload && load_done && !load_done()) {
            const actions = preload();
            // dispatcher.dispatch(actions, false);
        }
    }, [preload, load_done]);

    if (preload && load_done && !load_done()) {
        return fallback;
    }
    return children;
};

export const DataLoader = injectDispatcher<DataLoaderProps>(dataLoader);