import {
  RzElement, Component,
  createComponent, mountComponent, unmountComponent,
  isPrimitiveComponent, isCustomComponent, AbstractContainer, callWithErrorPropagation, PrimitiveContainer
} from "../internal";
import { ComponentRenderResult, RzElementPrimitiveProps } from "../models";

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
    component.children = newChildren.reduce((acc, item, index) => {
      const existing = currentChildren[index];

      acc = [...acc, updateChild(existing, item, component, component.container)];

      return acc;
    }, [] as Array<Component | null>);

  } else {
    const existing = currentChildren[0];
    component.children = [updateChild(existing, newChildren, component, component.container)];
  }

};

export const updateContainer = (newChildren: ComponentRenderResult, component: PrimitiveContainer) => {
  const currentChildren = component.children;

  if (Array.isArray(newChildren)) {
    component.children = newChildren.reduce((acc, item, index) => {
      const existing = currentChildren[index];

      acc = [...acc, updateChild(existing, item, component, component.graphic)];

      return acc;
    }, [] as Array<Component | null>);

  } else {
    const existing = currentChildren[0];
    component.children = [updateChild(existing, newChildren, component, component.graphic)];
  }

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

};



