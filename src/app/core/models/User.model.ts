import { Nominal } from "simplytyped";

export type UserId = Nominal<string, 'UserId'>;

export const toUserId = (source: unknown) => String(source) as UserId;

export interface User {
    id: UserId;
    email: string;
    avatar?: string;
    alias: string;
}