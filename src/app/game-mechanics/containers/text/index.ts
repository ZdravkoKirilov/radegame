import { RenderFunction, createElement } from "@app/render-kit";
import { Store } from "@ngrx/store";
import { AppState } from "@app/core";
import { withStore } from "../store";

type Props = {
    store: Store<AppState>;
}

const gameText: RenderFunction<Props> = (props) => {

    return createElement('text', {
        value: 'This is the visual root', styles: {
            x: 100,
            y: 125,
        }, textStyle: {
            fontSize: 18,
            stroke: '#141619',
            fill: '#141619'
        }
    });
};

export const GameText = withStore(gameText);