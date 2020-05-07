import { AppState } from "@app/core";
import { Memo, createElement } from "@app/render-kit";
import { RuntimeSlot, RuntimeModule, RuntimeWidget, connectToStore, RuntimeImageFrame } from "@app/game-mechanics";
import {
    selectCurrentModuleWidget,
    selectCurrentModuleWidgetSlots,
    selectModuleData, selectCurrentModuleWidgetFrame,
} from "../../../state";
import { DataLoader, DataLoaderProps } from "../data-loader";
import { ModuleWidget, ModuleWidgetProps } from "../../components/module-widget";

type StoreProps = {
    widget: RuntimeWidget;
    slots: RuntimeSlot[];
    module: RuntimeModule;
    frame: RuntimeImageFrame;
}

type Props = StoreProps;

const mainWidget = Memo<Props>(({ widget, slots, module, frame }) => {

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
            load_done: module.load_done,
            preload: module.preload,
        },
        createElement<ModuleWidgetProps>(
            ModuleWidget,
            { widget, slots, frame }
        )
    );
});

const mapStateToProps = (state: AppState): StoreProps => ({
    widget: selectCurrentModuleWidget(state),
    slots: selectCurrentModuleWidgetSlots(state),
    frame: selectCurrentModuleWidgetFrame(state),
    module: selectModuleData(state),
});

export const MainWidget = connectToStore(mapStateToProps)(mainWidget);