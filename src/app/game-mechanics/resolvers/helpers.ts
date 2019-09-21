import { GameTemplate } from "../models";
import { Setup, Round, Stage, ImageAsset, Slot } from "../entities";

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
    let total = [];
    setup_data.rounds.forEach(elem => {
        const round_data = conf.rounds[elem.round] as Round;
        const stage = conf.stages[round_data.board] as Stage;
        const image = conf.images[stage.image] as ImageAsset;
        const slot_images = Object.values(conf.slots).reduce(
            (acc, item: Slot) => {
                if (item.owner === stage.id) {
                    const slot_image: ImageAsset = conf.images[item.image];
                    acc.push(slot_image.image);
                }
                return acc;
            },
            []
        );
        total = [...total, image.image, ...slot_images];
    });

    return total;
};