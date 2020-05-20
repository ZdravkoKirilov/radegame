import { ContextState } from "../reducers";

export const ContextActionTypes = {
  MUTATE_CONTEXT: '[Arena/ContextAction] MUTATE_CONTEXT',
} as const;

export class MutateContext {
  readonly type = ContextActionTypes.MUTATE_CONTEXT;
  constructor(public payload: { context: ContextState }) { }
}

export type ContextAction = MutateContext;