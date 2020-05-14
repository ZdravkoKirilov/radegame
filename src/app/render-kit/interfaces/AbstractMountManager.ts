import { Component, RzElementType } from "../models";

export type MountConfig<T = any> = {
    width?: number;
    height?: number;
    backgroundColor?: number;
    assets?: Set<string>;
    props?: T;
}

export type MountRef = {
    component: Component;
    destroy: () => void;
}

export type AbstractMountManager<> = (
    rootComponent: RzElementType,
    DOMHost: HTMLElement,
    config: MountConfig,
) => Promise<MountRef>;