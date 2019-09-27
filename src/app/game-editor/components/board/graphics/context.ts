import { createContext } from "@app/render-kit";
import { GameEntitiesDict } from "../../../state";

export const MainContext = createContext<MainContextProps>();

export type MainContextProps = {
    entities: GameEntitiesDict;
};