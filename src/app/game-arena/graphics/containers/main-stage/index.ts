import { AppState } from "@app/core";
import { Memo, createElement } from "@app/render-kit";
import { ImageAsset, RuntimeSlot, RuntimeRound, RuntimeStage, connectToStore } from "@app/game-mechanics";
import {
    selectCurrentRoundStage, selectCurrentRoundStageImage,
    selectCurrentRoundStageSlots,
    selectRoundData
} from "../../../state";
import { DataLoader, DataLoaderProps } from "../data-loader";
import { RoundStage, RoundStageProps } from "../../components/round-stage";

type StoreProps = {
    stage: RuntimeStage;
    image: ImageAsset;
    slots: RuntimeSlot[];
    round: RuntimeRound;
}

type Props = StoreProps;

const mainStage = Memo<Props>(({ stage, image, slots, round }) => {

    return createElement<DataLoaderProps>(
        DataLoader,
        {
            fallback: createElement('text', {
                value: 'Loading...',
                styles: {
                    x: 50, y: 50,
                },
                textStyle: {
                    fill: ['#333231'], stroke: '#333231'
                }
            }),
            load_done: round.load_done,
            preload: round.preload,
        },
        createElement<RoundStageProps>(
            RoundStage,
            { stage, image, slots }
        )
    );
});

const mapStateToProps = (state: AppState): StoreProps => ({
    stage: selectCurrentRoundStage(state),
    image: selectCurrentRoundStageImage(state),
    slots: selectCurrentRoundStageSlots(state) as any,
    round: selectRoundData(state),
});

export const MainStage = connectToStore(mapStateToProps)(mainStage);