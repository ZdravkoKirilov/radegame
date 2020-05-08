import { AppState } from "@app/core";
import { Memo, createElement } from "@app/render-kit";
import { RuntimeWidgetNode, RuntimeModule, RuntimeWidget, connectToStore, RuntimeImageFrame } from "@app/game-mechanics";
import {
    selectCurrentModuleWidget,
    selectCurrentModuleWidgetNodes,
    selectModuleData, selectCurrentModuleWidgetFrame,
} from "../../../state";
import { DataLoader, DataLoaderProps } from "../data-loader";
import { ModuleWidget, ModuleWidgetProps } from "../../components/module-widget";

type StoreProps = {
    widget: RuntimeWidget;
    nodes: RuntimeWidgetNode[];
    module: RuntimeModule;
    frame: RuntimeImageFrame;
}

type Props = StoreProps;

const mainWidget = Memo<Props>(({ widget, nodes, module, frame }) => {

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
            { widget, nodes: nodes, frame }
        )
    );
});

const mapStateToProps = (state: AppState): StoreProps => ({
    widget: selectCurrentModuleWidget(state),
    nodes: selectCurrentModuleWidgetNodes(state),
    frame: selectCurrentModuleWidgetFrame(state),
    module: selectModuleData(state),
});

export const MainWidget = connectToStore(mapStateToProps)(mainWidget);