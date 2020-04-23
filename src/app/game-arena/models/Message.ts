export type ChatMessage = {
    id: string;
    owner: string;
    lobby: string;

    message: string;
    timestamp: number;
}