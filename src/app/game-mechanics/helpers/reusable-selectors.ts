import { GameTemplate, ExpressionContext } from "../models";
import { RuntimeStage, RuntimeSlot } from "../entities";
import { enrichSlot } from "./entity-composers";
import { withMemo } from "@app/shared";
import { StatefulComponent } from "@app/render-kit";

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

const _selectSlotStyleSync = (slot: RuntimeSlot, component: StatefulComponent) => {
  if (slot) {
    if (slot.style) {
      const style = slot.style({ slot, component });
      return style;
    }
    return slot.style_inline;
  }
  return {};
};

export const selectSlotStyleSync = withMemo(_selectSlotStyleSync);