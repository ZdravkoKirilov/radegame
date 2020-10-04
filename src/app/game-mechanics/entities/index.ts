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

import { Module, RuntimeModule } from './Module.model';
import { RuntimeWidget, Widget } from './Widget.model';
import { RuntimeToken, Token } from './Token.model';
import { RuntimeWidgetNode, WidgetNode } from './WidgetNode.model';
import { RuntimeSetup, Setup } from './Setup.model';
import { Dictionary } from '@app/shared';
import { ImageAsset } from './ImageAsset.model';
import { DtoGame, DtoGameLanguage, Game, RuntimeGame, RuntimeGameLanguage } from '../models';
import { Style } from './Style.model';
import { Sound } from './Sound.model';
import { Expression, RuntimeExpression } from './Expression.model';
import { Animation, DtoAnimation, RuntimeAnimation } from './Animation.model';
import { RuntimeText, Text } from './Text.model';
import { RuntimeSonata, Sonata } from './Sonata.model';
import { RuntimeShape, Shape } from './Shape.model';
import { RuntimeSandbox, Sandbox } from './Sandbox.model';
import { RuntimeVersion, Version } from './Version.model';

export type GameEntity = Game | WidgetNode | Module | Widget | Token | Version |
    Setup | ImageAsset | Style | Sound | Expression | Animation | Text | Sonata | Shape | Sandbox;

export type RuntimeGameEntity = RuntimeGame | RuntimeWidgetNode | RuntimeModule | RuntimeWidget | RuntimeToken |
RuntimeVersion | RuntimeSetup | RuntimeExpression | RuntimeAnimation |
RuntimeText | RuntimeSonata | RuntimeShape | RuntimeSandbox | RuntimeGameLanguage;

export type DtoGameEntity = DtoGame | DtoGameLanguage | DtoAnimation;

export type GameEntityUnion = Game & WidgetNode & Module & Widget & Token | Setup & ImageAsset &
    Style & Sound & Expression & Animation & Text & Sonata & Shape & Sandbox;

export type GameEntityList = Dictionary<GameEntity>;

export * from './types';
