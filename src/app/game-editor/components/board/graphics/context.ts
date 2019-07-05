import { createContext } from "@app/render-kit";
import { Stage, ImageAsset, Style, Slot } from "@app/game-mechanics";

export const MainContext = createContext<MainContextProps>();

export type MainContextProps = {
    stages: Stage[];
    images: ImageAsset[];
    styles: Style[];
    slots: Slot[];
}