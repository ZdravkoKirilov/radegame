import { RuntimeRound } from "../../entities";
import { RenderFunction, RzElement } from "@app/render-kit";

export type DataLoaderProps = {
    round: RuntimeRound;
    children?: RzElement;
}

export const DataLoader: RenderFunction<DataLoaderProps> = ({ round, children }) => {
    if (round && round.preload && round.load_done && !round.load_done()) {
        throw round.preload();
    }
    throw new Promise(() => null);
    // return children;
};