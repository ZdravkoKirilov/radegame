export const composePlayerName = (gameTitle: string, lobbyName: string, playerAlias: string) => {
    return `${gameTitle}:${lobbyName}:${playerAlias}`;
};

export const extractPlayerName = (source: string) => {
    return (source || '').split(':')[2] || 'Name unavailable';
};