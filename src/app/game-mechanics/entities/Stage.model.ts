export interface Stage {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
}
export interface StageList {
    [key: string]: Stage;
}






