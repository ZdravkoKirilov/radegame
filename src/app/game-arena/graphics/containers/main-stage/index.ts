import { AppState } from "@app/core";
import { Memo, createElement } from "@app/render-kit";
import { RuntimeSlot, RuntimeRound, RuntimeStage, connectToStore, RuntimeImageFrame } from "@app/game-mechanics";
import {
    selectCurrentRoundStage,
    selectCurrentRoundStageSlots,
    selectRoundData, selectCurrentRoundStageFrame,
} from "../../../state";
import { DataLoader, DataLoaderProps } from "../data-loader";
import { RoundStage, RoundStageProps } from "../../components/round-stage";

type StoreProps = {
    stage: RuntimeStage;
    slots: RuntimeSlot[];
    round: RuntimeRound;
    frame: RuntimeImageFrame;
}

type Props = StoreProps;

const mainStage = Memo<Props>(({ stage, slots, round, frame }) => {

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
            { stage, slots, frame }
        )
    );
});

const mapStateToProps = (state: AppState): StoreProps => ({
    stage: selectCurrentRoundStage(state),
    slots: selectCurrentRoundStageSlots(state),
    frame: selectCurrentRoundStageFrame(state),
    round: selectRoundData(state),
});

export const MainStage = connectToStore(mapStateToProps)(mainStage);