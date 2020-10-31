import { Module } from './Module.model';
import { Widget } from './Widget.model';
import { Token, TokenNode } from './Token.model';
import { NodeHandler, NodeLifecycle, WidgetNode } from './WidgetNode.model';
import { Setup } from './Setup.model';
import { ImageAsset } from './ImageAsset.model';
import { Style } from './Style.model';
import { Sound } from './Sound.model';
import { Expression } from './Expression.model';
import { Animation, AnimationStep } from './Animation.model';
import { Version } from './Version.model';
import { Sonata, SonataStep } from './Sonata.model';
import { Shape, ShapePoint } from './Shape.model';
import { Sandbox } from './Sandbox.model';
import { Translation, Text } from './Text.model';
import { Game, GameLanguage } from './Game.model';

export type VersionedEntity = Module | Setup;

export type ModularEntity = Widget | Token | Text | ImageAsset | Style | Sound | Expression | Animation | Sonata |
    Shape | Sandbox;

export type NestedEntity = WidgetNode | NodeLifecycle | NodeHandler | Translation | TokenNode |
    AnimationStep | SonataStep | GameLanguage | ShapePoint;

export type GameEntity = Game | Version | VersionedEntity | ModularEntity | NestedEntity;

export type EntityWithChildren = WidgetNode | Token | Text | Widget | Animation | Sonata | Setup;


export const STORE_KEYS = {
    modules: 'modules',
    widgets: 'widgets',
    tokens: 'tokens',
    images: 'images',
    styles: 'styles',
    sounds: 'sounds',
    expressions: 'expressions',
    animations: 'animations',
    setups: 'setups',
    texts: 'texts',
    sonatas: 'sonatas',
    shapes: 'shapes',
    sandboxes: 'sandboxes',
} as const;

export type StoreKey = keyof typeof STORE_KEYS;