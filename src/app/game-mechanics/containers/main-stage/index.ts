import { AppState } from "@app/core";
import { Memo, createElement } from "@app/render-kit";
import { RoundStage, RoundStageProps } from "../../components";
import { connect } from "../../hocs";
import { Stage, ImageAsset, RuntimeSlot, RuntimeRound } from "../../entities";
import {
    selectCurrentRoundStage, selectCurrentRoundStageImage,
    selectCurrentRoundStageSlots,
    selectRoundData
} from "@app/game-arena";

type StoreProps = {
    stage: Stage;
    image: ImageAsset;
    slots: RuntimeSlot[];
    round: RuntimeRound;
}

type Props = StoreProps;

const mainStage = Memo<Props>(({ stage, image, slots }) => {

    const hasData = stage && image && slots;

    return hasData ? createElement<RoundStageProps>(
        RoundStage,
        { stage, image, slots }
    ) : null;
});

const mapStateToProps = (state: AppState): StoreProps => ({
    stage: selectCurrentRoundStage(state),
    image: selectCurrentRoundStageImage(state),
    slots: selectCurrentRoundStageSlots(state),
    round: selectRoundData(state),
});

export const MainStage = connect(mapStateToProps)(mainStage);