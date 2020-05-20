import immer from 'immer';

import { ExpressionContext } from "@app/game-mechanics";
import { ContextAction, ContextActionTypes } from '../actions';

export type ContextState = Partial<ExpressionContext>;

export function contextReducer(state: ContextState, action: ContextAction): ContextState {
  switch (action.type) {
    case ContextActionTypes.MUTATE_CONTEXT:
      return immer(state, draft => {
        draft = { ...draft, ...action.payload.context };
      });
    default:
      return state;
  }
};
