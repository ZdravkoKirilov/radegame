import { RuntimeRound } from "../../entities";
import { RenderFunction } from "@app/render-kit";

export type DataLoaderProps = {
    round: RuntimeRound;
}

export const DataLoader: RenderFunction<DataLoaderProps> = ({ round }) => {
    if (!round.load_done()) {
        round.preload();
    }
    return null;
};