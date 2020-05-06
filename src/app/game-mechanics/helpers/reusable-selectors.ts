import get from "lodash/get";

import { withMemo } from "@app/shared";
import { StatefulComponent } from "@app/render-kit";

import { RuntimeWidget, RuntimeSlot, RuntimeText } from "../entities";
import { enrichSlot, enrichFrame, enrichText } from "./entity-composers";
import { ExpressionContext } from "./expression-context";

export const selectChildPropsSync = (slot: RuntimeSlot, component: StatefulComponent) => {
  const handler = slot.pass_to_children;
  if (typeof handler === 'function') {
    const result = handler({ slot, component });
    return result;
  }
};

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


const _selectWidgetFrameSync = (widget: RuntimeWidget, context: ExpressionContext, component: StatefulComponent) => {
  if (widget) {
    const { frame_getter } = widget;
    if (typeof frame_getter === 'function') {
      const frame = frame_getter({ widget, component, });
      return enrichFrame(context.conf, context, frame);
    }
    const frame = widget.frames[0];
    return enrichFrame(context.conf, context, frame);
  }
  return null;
}
export const selectWidgetFrameSync = withMemo(_selectWidgetFrameSync);


const _selectWidgetSlotsSync = (widget: RuntimeWidget, context: ExpressionContext, component: StatefulComponent) => {
  if (widget) {
    const { slot_getter } = widget;
    if (typeof slot_getter === 'function') {
      return slot_getter({ widget, component }).map(elem => enrichSlot(context.conf, context, elem));
    }
    return widget.slots.map(elem => enrichSlot(context.conf, context, elem));
  }
  return [];
};
export const selectWidgetSlotsSync = withMemo(_selectWidgetSlotsSync);


const _selectSlotTextSync = (slot: RuntimeSlot, context: ExpressionContext, component: StatefulComponent, language = 2) => {
  if (slot) {
    let runtimeText: RuntimeText = null;
    if (slot.display_text_inline) {
      runtimeText = enrichText(context.conf, context, slot.display_text_inline);
    }
    if (slot.display_text) {
      const text = slot.display_text({ slot, component });
      runtimeText = enrichText(context.conf, context, text);
    }

    if (runtimeText) {
      const translation = (runtimeText.translations || []).find(elem => elem.language === language);
      runtimeText = { ...runtimeText, computed_value: get(translation, 'value', runtimeText.default_value) };
    }
    return runtimeText;
  }
  return null;
}
export const selectSlotTextSync = withMemo(_selectSlotTextSync);