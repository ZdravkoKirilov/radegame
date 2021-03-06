export * from './Module.model';
export * from './Widget.model';
export * from './Token.model';
export * from './WidgetNode.model';
export * from './Setup.model';
export * from './ImageAsset.model';
export * from './Base.model';
export * from './Style.model';
export * from './Sound.model';
export * from './Expression.model';
export * from './Animation.model';
export * from './Text.model';
export * from './Sonata.model';
export * from './Shape.model';
export * from './Version.model';

export * from './Sandbox.model';

export * from './types';

import { Module } from './Module.model';
import { Widget } from './Widget.model';
import { Token } from './Token.model';
import { WidgetNode } from './WidgetNode.model';
import { Setup } from './Setup.model';
import { Dictionary } from '@app/shared';
import { ImageAsset } from './ImageAsset.model';
import { Game } from '../models';
import { Style } from './Style.model';
import { Sound } from './Sound.model';
import { Expression } from './Expression.model';
import { Animation } from './Animation.model';
import { Text } from './Text.model';
import { Sonata } from './Sonata.model';
import { Shape } from './Shape.model';
import { Sandbox } from './Sandbox.model';
import { Version } from './Version.model';

export type GameEntity = Game | WidgetNode | Module | Widget | Token | Version |
    Setup | ImageAsset | Style | Sound | Expression | Animation | Text | Sonata | Shape | Sandbox;

export type GameEntityUnion = Game & WidgetNode & Module & Widget & Token | Setup & ImageAsset &
    Style & Sound & Expression & Animation & Text & Sonata & Shape & Sandbox;

export type GameEntityList = Dictionary<GameEntity>;

export * from './types';
