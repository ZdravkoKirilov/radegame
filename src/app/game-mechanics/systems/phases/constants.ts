export const phases = {
    PLACE_ACTIONS: 'PLACE_ACTIONS',
    RESOLVE_ACTIONS: 'RESOLVE_ACTIONS',
    PLACE_QUESTS: 'PLACE_QUESTS',
    RESOLVE_QUESTS: 'RESOLVE_QUESTS',
    PLAY_QUESTS: 'PLAY_QUESTS'
}

export type PhaseType = typeof phases.PLACE_ACTIONS |
    typeof phases.RESOLVE_ACTIONS | typeof phases.PLACE_QUESTS |
    typeof phases.RESOLVE_QUESTS | typeof phases.PLAY_QUESTS;