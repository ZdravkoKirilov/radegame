import { isArray } from "lodash";

import { RzElementProps, RzElement, RzElementType } from "../internal";
import { CustomComponentChildrenProp, isRzElement, isRzElementType } from "../models";

export const createElement = <T extends RzElementProps>(
  type: RzElementType,
  props?: T,
  ...children: Array<RzElement | null> | [Array<RzElement>]
): RzElement<T> => {

  if (!isRzElementType(type)) {
    throw new TypeError('Invalid type passed to createElement: ' + type);
  }

  let computedChildren: CustomComponentChildrenProp = children as Array<RzElement | null>;

  /* Heuristics: if total children length is 1, we assume:
  1. single RzElement child is transformed into a single item so that we could do
  return this.props.children in CustomComponents
  2. If it's an array of arrays, it's a keyed collection - we expect only 1 inner array
  for simplicity */

  const firstChild = children[0];

  if (children.length === 1) {

    if (childIsSingleRzElement(firstChild)) {
      computedChildren = firstChild;
    }
  }

  if (isArray(firstChild)) {
    computedChildren = firstChild;
  }


  props = props || {} as T;

  props['children'] = computedChildren;
  Object.freeze(props); // props are immutable

  return { type, props };
};

const childIsSingleRzElement = (child: unknown): child is RzElement => {
  return isRzElement(child)
};