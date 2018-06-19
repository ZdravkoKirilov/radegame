import { Container } from "pixi.js";

import { Component } from "./Component";
import { BaseProps, MetaProps } from "../models";
import { Factory } from "../helpers";

export type Mounter = (props: BaseProps, container: Container, parent: Component, factory: Factory, meta?: MetaProps) => Component;