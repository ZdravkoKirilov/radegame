export interface Trap {
    id: number;
    name: string;
}

export interface TrapsList {
    [key: string]: Trap;
}