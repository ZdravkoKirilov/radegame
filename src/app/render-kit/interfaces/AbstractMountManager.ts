import { Component, RzElementType } from "../models";

export type MountConfig = {
    width?: number;
    height?: number;
    backgroundColor?: number;
    assets?: Set<string>;
}

export type MountRef = {
    component: Component;
    destroy: () => void;
}

export type AbstractMountManager = (
    rootComponent: RzElementType,
    DOMHost: HTMLElement,
    config: MountConfig
) => Promise<MountRef>;