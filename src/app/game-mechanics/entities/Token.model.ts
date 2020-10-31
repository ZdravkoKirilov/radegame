import { Nominal, Omit } from "simplytyped";
import { omit } from "lodash/fp";

import { safeJSON, Tagged } from "@app/shared";
import { RzStyles } from "@app/render-kit";

import { BaseModel, GameEntityParser, WithStyle } from "./Base.model";
import { toWidgetId, Widget, WidgetId } from "./Widget.model";
import { enrichEntity } from "../helpers";
import { toModuleId } from "./Module.model";
import { Text, TextId, toTextId } from "./Text.model";
import { ImageAsset, ImageAssetId, toImageId } from "./ImageAsset.model";
import { Style, toStyleId } from "./Style.model";
import { Shape, ShapeId, toShapeId } from "./Shape.model";
import { tokenName } from "@angular/compiler";

export type TokenId = Nominal<string, 'TokenId'>;
export const toTokenId = (source: unknown) => String(source) as TokenId;

export type Token = BaseModel<TokenId> & Tagged<'Token'> & {
  template: WidgetId;
  keywords: string;

  nodes: TokenNode[];
};

type DtoToken = Omit<Token, '__tag' | 'id' | 'module' | 'template' | 'nodes'> & {
  id: number;
  module: number;
  template: number;

  nodes: DtoTokenNode[];
};

export type RuntimeToken = Omit<Token, 'template'> & {
  template: Widget;
}

export const Token: GameEntityParser<Token, DtoToken, RuntimeToken> & TokenOperations = {

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Token',
      id: toTokenId(dto.id),
      module: toModuleId(dto.module),
      template: toWidgetId(dto.template),
      nodes: dto.nodes.map(elem => TokenNode.toEntity(elem))
    };
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      module: Number(entity.module),
      template: Number(entity.template),
      nodes: entity.nodes.map(elem => TokenNode.toDto(elem))
    }
  },

  toRuntime(context, token) {
    if (token) {
      return enrichEntity<Token, RuntimeToken>(context.conf, {
        template: 'widgets',
      }, token);
    }
    return null;
  },

  saveNode(token, node) {
    return {
      ...token,
      nodes: token.nodes.map(elem => elem.id === node.id ? node : elem)
    };
  }

}

type TokenOperations = {
  saveNode: (token: Token, node: TokenNode) => Token;
}

type TokenNodeId = Nominal<string, 'TokenNodeId'>;
const toTokenNodeId = (source: unknown) => String(source) as TokenNodeId;

export type TokenNode = Tagged<'TokenNode'> & WithStyle & {
  id: TokenNodeId;
  owner: TokenId;

  name: string;
  description: string;

  text: TextId;
  image: ImageAssetId;
  widget: WidgetId;
  shape: ShapeId;
};

type DtoTokenNode = Omit<TokenNode, '__tag' | 'id' | 'owner' | 'style' | 'image' | 'widget' | 'text' | 'shape'> & {
  id: number;
  owner: number;
  style: number;
  image: number;
  widget: number;
  text: number;
  shape: number;
};

type RuntimeTokenNode = Omit<TokenNode, 'style' | 'style_inline' | 'image' | 'widget' | 'text' | 'shape'> & {
  style: Style;
  style_inline: RzStyles;

  image: ImageAsset;
  widget: Widget;
  text: Text;
  shape: Shape;
};

const TokenNode: GameEntityParser<TokenNode, DtoTokenNode, RuntimeTokenNode> = {

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'TokenNode',
      id: toTokenNodeId(dto.id),
      owner: toTokenId(dto.owner),
      style: toStyleId(dto.style),
      image: toImageId(dto.image),
      widget: toWidgetId(dto.widget),
      text: toTextId(dto.text),
      shape: toShapeId(dto.shape),
    };
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      owner: Number(entity.owner),
      style: Number(entity.style),
      image: Number(entity.image),
      widget: Number(entity.widget),
      text: Number(entity.text),
      shape: Number(entity.shape),
    };
  },

  toRuntime(context, entity) {
    return enrichEntity<TokenNode, RuntimeTokenNode>(
      context.conf,
      {
        style: 'styles',
        image: 'images',
        widget: 'widgets',
        text: 'texts',
        shape: 'shapes',
        style_inline: src => safeJSON(src, {}),
      },
      entity
    );
  },
};