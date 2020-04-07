import { RzElementType, Component } from "../../models";
import { Dictionary } from "@app/shared";
import { findInAncestors } from "../../helpers";
import { ContextProvider } from "./Provider";

export const findContextProvider = (startFrom: Component, parentName?: string, key?: RzElementType) => {
  let matcher: Dictionary | RzElementType;
  if (parentName) {
      matcher = { name: parentName };
  } else {
      matcher = key;
  }
  const providerContext = findInAncestors<typeof ContextProvider.prototype>(startFrom)(matcher);
  return providerContext;
};