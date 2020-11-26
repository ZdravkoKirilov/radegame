import { get, isUndefined } from "lodash";

import { toDictionary } from "@app/shared";

import {
  RzElement, Component,
  createComponent, mountComponent, unmountComponent,
  isPrimitiveComponent, isCustomComponent, AbstractContainer, callWithErrorPropagation, PrimitiveContainer
} from "../internal";
import { ComponentRenderResult, isRzElement, RzElementPrimitiveProps } from "../models";

export const updateComponent = (component: Component, rendered: ComponentRenderResult) => {
  if (isPrimitiveComponent(component)) {
    component.update();
  } else {
    updateCustomContainer(rendered, component);
  }
};

export const updateCustomContainer = (newChildren: ComponentRenderResult, component: Component) => {
  const currentChildren = component.children;

  if (Array.isArray(newChildren)) {

    if (get(component.props, 'keyedChildren')) {
      updateKeyedChildren(newChildren, component, component.container);
    } else {
      component.children = newChildren.reduce((acc, item, index) => {
        const existing = currentChildren[index];

        acc = [...acc, updateChild(existing, item, component, component.container)];

        return acc;
      }, [] as Array<Component | null>);
    }

  } else {
    const existing = currentChildren[0];
    component.children = [updateChild(existing, newChildren, component, component.container)];
  }
};

export const updateContainer = (newChildren: ComponentRenderResult, component: PrimitiveContainer) => {
  const currentChildren = component.children;

  if (Array.isArray(newChildren)) {

    if (get(component.props, 'keyedChildren')) {
      updateKeyedChildren(newChildren, component, component.graphic);
    } else {
      component.children = newChildren.reduce((acc, item, index) => {
        const existing = currentChildren[index];

        acc = [...acc, updateChild(existing, item, component, component.graphic)];

        return acc;
      }, [] as Array<Component | null>);
    }

  } else {
    const existing = currentChildren[0];
    component.children = [updateChild(existing, newChildren, component, component.graphic)];
  }
};

export const updateKeyedChildren = (
  newChildren: Array<RzElement | null>,
  component: Component,
  mountTo: AbstractContainer,
) => {
  const currentChildren = toDictionary(component.children, 'props.key');

  component.children = newChildren.map(newChildElement => {
    if (isRzElement(newChildElement)) {
      const key = get(newChildElement.props, 'key');

      if (!key) {
        throw new Error('Each element in a keyed collection must have a "key" prop. Shame.');
      }

      const childWithSameKey = currentChildren[key];

      if (childWithSameKey) {
        updateComponentPropsByType(childWithSameKey, newChildElement);
        return childWithSameKey;
      } else {
        const newChild = createComponent(newChildElement, component.meta.engine.factory, component.meta, component);
        mountComponent(newChild, mountTo);
        updateComponentPropsByType(newChild, newChildElement);
        return newChild;
      }
    }
    return null;
  });

  const indexedNewChildren = toDictionary(component.children, 'props.key');

  Object.entries(currentChildren).map(([key, component]) => {
    if (isUndefined(indexedNewChildren[key]) && component) {
      unmountComponent(component);
    }
  });

};

const updateChild = (
  currentChild: Component | null,
  incomingChild: RzElement | null,
  component: Component,
  container: AbstractContainer
): Component | null => {

  if (currentChild && incomingChild) {

    const sameType = currentChild.type === incomingChild.type;
    if (sameType) {
      updateComponentPropsByType(currentChild, incomingChild);
      return currentChild;
    } else {
      const newInstance = createComponent(incomingChild, component.meta!.engine.factory, component.meta!, component);
      mountComponent(newInstance, container);
      unmountComponent(currentChild);
      return newInstance;
    }
  }

  if (currentChild && !incomingChild) {
    unmountComponent(currentChild);
    return null;
  }

  if (!currentChild && incomingChild) {
    const newInstance = createComponent(incomingChild, component.meta!.engine.factory, component.meta!, component);
    mountComponent(newInstance, container);
    return newInstance;
  }

  return null;
};

const updateComponentPropsByType = (target: Component, updated: RzElement) => {

  if (isCustomComponent(target)) {
    callWithErrorPropagation(target.parent, () => target.updateProps(updated.props));
  }

  if (isPrimitiveComponent(target)) {
    target.updateProps(updated.props as RzElementPrimitiveProps);
  }

  throw new Error('Unrecognized component child: ' + JSON.stringify(target));

};



