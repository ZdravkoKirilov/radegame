import { AppState } from "@app/core";
import { Memo, createElement } from "@app/render-kit";
import { RuntimeSlot, RuntimeRound, RuntimeWidget, connectToStore, RuntimeImageFrame } from "@app/game-mechanics";
import {
    selectCurrentRoundWidget,
    selectCurrentRoundWidgetSlots,
    selectRoundData, selectCurrentRoundWidgetFrame,
} from "../../../state";
import { DataLoader, DataLoaderProps } from "../data-loader";
import { RoundWidget, RoundWidgetProps } from "../../components/round-widget";

type StoreProps = {
    widget: RuntimeWidget;
    slots: RuntimeSlot[];
    round: RuntimeRound;
    frame: RuntimeImageFrame;
}

type Props = StoreProps;

const mainWidget = Memo<Props>(({ widget, slots, round, frame }) => {

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
        createElement<RoundWidgetProps>(
            RoundWidget,
            { widget, slots, frame }
        )
    );
});

const mapStateToProps = (state: AppState): StoreProps => ({
    widget: selectCurrentRoundWidget(state),
    slots: selectCurrentRoundWidgetSlots(state),
    frame: selectCurrentRoundWidgetFrame(state),
    round: selectRoundData(state),
});

export const MainWidget = connectToStore(mapStateToProps)(mainWidget);