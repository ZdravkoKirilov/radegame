import { Dictionary } from "@app/shared";

import { RzElementType, Component, findInAncestors, ContextProvider } from "../../internal";

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