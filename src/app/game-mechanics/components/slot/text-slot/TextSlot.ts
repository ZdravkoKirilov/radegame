import { RenderFunction, createElement } from "@app/render-kit";

export type Props = {

}

export const TextSlot: RenderFunction<Props> = () => {
    return createElement('fragment', {});
};
