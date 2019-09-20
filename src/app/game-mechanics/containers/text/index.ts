import { RenderFunction, createElement } from "@app/render-kit";
import { Store, select } from "@ngrx/store";
import { AppState } from "@app/core";
import { withStore } from "../store";
import { selectSetupData } from "app/game-arena/state";
import { map } from "rxjs/operators";
import { Setup } from "app/game-mechanics/entities";

type Props = {
    store: Store<AppState>;
}

const gameText: RenderFunction<Props> = (props, { useEffect, useState }) => {
    const [setup, setSetup] = useState<Setup>(null);

    useEffect(() => {
        const sub = props.store.pipe(
            select(selectSetupData),
            map(data => {
                debugger;
                setSetup(data);
            })
        ).subscribe();

        return () => {
            debugger;
            sub.unsubscribe();
        }
    }, []);

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