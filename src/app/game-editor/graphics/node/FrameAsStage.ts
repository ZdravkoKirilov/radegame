import { createElement, RenderFunction, } from "@app/render-kit";
import { AppState } from "@app/core";
import { connect, RuntimeStage } from "@app/game-mechanics";

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

export default connect(mapStateToProps)(FrameAsStage);