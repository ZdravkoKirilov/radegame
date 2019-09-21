import { RenderFunction, createElement } from "@app/render-kit";
import { Store, select } from "@ngrx/store";
import { AppState } from "@app/core";
import { withStore } from "../../hocs";
import { selectSetupData } from "app/game-arena/state";
import { map, filter } from "rxjs/operators";
import { Setup } from "app/game-mechanics/entities";
import { selectGameInstanceId } from "@app/shared";

type Props = {
    store: Store<AppState>;
}

const gameText: RenderFunction<Props> = (props, { useEffect, useState }) => {
    const [setup, setSetup] = useState<Setup>(null);

    useEffect(() => {
        const sub = props.store.pipe(
            select(selectGameInstanceId),
            map(data => {
                console.log(data);
                setSetup(data);
            })
        ).subscribe();

        return () => {
            sub.unsubscribe();
        }
    }, []);

    return createElement('text', {
        value: setup || 'Placeholder', styles: {
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