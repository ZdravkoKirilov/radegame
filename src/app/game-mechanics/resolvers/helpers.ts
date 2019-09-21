import { GameTemplate } from "../models";
import { Setup, Round, Stage, ImageAsset } from "../entities";

export const evaluate = (src: string, context: any): any => {
    try {
        const result = (new Function("with(this) { return " + src + "}")).call(context);
        return result !== undefined ? result : '';
    } catch (err) {
        return '';
    }
};

export const getAllImageAssets = (setup_id: number, conf: GameTemplate) => {
    const setup_data = conf.setups[setup_id] as Setup;
    const total = setup_data.rounds.map(elem => {
        const round_data = conf.rounds[elem.round] as Round;
        const stage = conf.stages[round_data.board] as Stage;
        const image = conf.images[stage.image] as ImageAsset;
        return image.image;
    });

    return total;
};