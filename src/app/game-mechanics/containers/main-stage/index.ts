import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

import { AppState } from "@app/core";
import { Memo, createElement } from "@app/render-kit";
import { RoundStage, RoundStageProps } from "../../components";
import { withStore } from "../../hocs";
import { Stage, ImageAsset, RuntimeSlot } from "../../entities";
import {
    selectCurrentRoundStage, selectCurrentRoundStageImage,
    selectCurrentRoundStageSlots
} from "@app/game-arena";


type Props = {
    store: Store<AppState>;
};

const mainStage = Memo<Props>(({ store }, { useState, useEffect }) => {
    const [stage, setStage] = useState<Stage>(null);
    const [image, setImage] = useState<ImageAsset>(null);
    const [slots, setSlots] = useState<RuntimeSlot[]>(null);

    const hasData = stage && image && slots;

    useEffect(() => {
        const subs: Subscription[] = [
            store.pipe(select(selectCurrentRoundStage), map(stage => setStage(stage))).subscribe(),
            store.pipe(select(selectCurrentRoundStageImage), map(image => setImage(image))).subscribe(),
            store.pipe(select(selectCurrentRoundStageSlots), map(slots => setSlots(slots))).subscribe(),
        ];

        return () => subs.forEach(sub => sub.unsubscribe());
    }, []);

    return hasData ? createElement<RoundStageProps>(
        RoundStage,
        { stage, image, slots }
    ) : null;
});

export const MainStage = withStore(mainStage);