import { GameTemplate, ExpressionContext } from "../models";
import { RuntimeStage } from "../entities";
import { enrichSlot } from "./entity-composers";
import { withMemo } from "@app/shared";

const _selectStageSlotsSync = (entities: GameTemplate, context: ExpressionContext, stage: RuntimeStage, state: any) => {
  if (stage) {
      const { slot_getter } = stage;
      if (typeof slot_getter === 'function') {
          return slot_getter(stage).map(elem => enrichSlot(entities, context, elem));
      }
      return stage.slots.map(elem => enrichSlot(entities, context, elem));
  }
  return [];
};

export const selectStageSlotsSync = withMemo(_selectStageSlotsSync);