import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { connectToStore, RuntimeStage } from "@app/game-mechanics";

export type FrameAsStageProps = {
    stage: RuntimeStage;
}

type StoreProps = {

};

const FrameAsStage: RenderFunction<FrameAsStageProps & StoreProps> = ({ stage }) => {
    return createElement(null);
};

const mapStateToProps = (state: AppState, ownProps: FrameAsStageProps): StoreProps => ({

});

export default connectToStore(mapStateToProps)(FrameAsStage);