export interface WinConditions {
    [key: string]: () => boolean;
}

export interface LoseConditions {
    [key: string]: () => boolean;
}

export interface EndCondition {
    win: WinConditions;
    lose: LoseConditions;
}
