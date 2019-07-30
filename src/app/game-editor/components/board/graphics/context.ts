import { createContext } from "@app/render-kit";
import { GameEntitiesDict } from "@app/game-mechanics";

export const MainContext = createContext<MainContextProps>();

export type MainContextProps = {
    entities: GameEntitiesDict;
};