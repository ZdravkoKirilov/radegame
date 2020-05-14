import { RenderFunction, RzElement } from "@app/render-kit";

export type DataLoaderProps = {
    preload: Function;
    load_done: Function;
    fallback: RzElement;
    children?: RzElement;
};

export const DataLoader: RenderFunction<DataLoaderProps> = ({ preload, load_done, fallback, children }, { useEffect }) => {
    useEffect(() => {
        if (preload && load_done && !load_done()) {
            preload();
        }
    }, [preload, load_done]);

    if (preload && load_done && !load_done()) {
        return fallback;
    }
    return children;
};