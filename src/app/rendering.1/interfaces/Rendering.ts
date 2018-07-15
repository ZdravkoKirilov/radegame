import { Container } from "pixi.js-legacy";

import { Component } from "./Component";
import { BaseProps, MetaProps } from "../models";
import { Factory } from "../helpers";

export type Mounter = (props: BaseProps, container: Container, parent: Component, factory: Factory, meta?: MetaProps) => Component;

export type CurriedMounter = (props: BaseProps) => Component;

export type Patcher = (target: Component) => void;