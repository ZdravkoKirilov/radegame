import { RenderFunction, createElement } from "@app/render-kit";

import RoundListener from './round';

export const ListenersOrchestrator: RenderFunction = () => {
    return createElement('fragment', null,
        createElement(RoundListener),
    );
};