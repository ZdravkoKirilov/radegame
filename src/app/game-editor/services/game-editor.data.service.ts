import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  Animation, AnimationId, TextId, Text, Token, TokenId, Widget, WidgetId, ImageAssetId, ImageAsset, ExpressionId,
  Expression, SandboxId, Sandbox, ModuleId, Module, SetupId, Setup, VersionId, Version, GameId, Game, StyleId,
  Style, SonataId, Sonata, SoundId, Sound, ShapeId, Shape, VersionedEntity, ModularEntity, WidgetNodeId, WidgetNode, GameEntity, GameData
} from '@app/game-mechanics';
import { GameEditService, GameFetchService } from '@app/core';
import { arrayToMap } from '@app/shared';

type EntityData<Key extends string, Value> = {
  byId: Map<Key, Value>;
}

type FetchPayload =
  { entityType: VersionedEntity["__tag"], versionId: VersionId } |
  { entityType: ModularEntity['__tag'], moduleId: ModuleId } |
  { entityType: Version['__tag'], gameId: GameId } |
  { entityType: Game['__tag'] };

const initialData = { byId: new Map() };

@Injectable({
  providedIn: 'root'
})
export class GameEditorDataService {

  private _animations$ = new BehaviorSubject<EntityData<AnimationId, Animation>>(initialData);
  private _tokens$ = new BehaviorSubject<EntityData<TokenId, Token>>(initialData);
  private _widgets$ = new BehaviorSubject<EntityData<WidgetId, Widget>>(initialData);
  private _texts$ = new BehaviorSubject<EntityData<TextId, Text>>(initialData);
  private _images$ = new BehaviorSubject<EntityData<ImageAssetId, ImageAsset>>(initialData);
  private _expressions$ = new BehaviorSubject<EntityData<ExpressionId, Expression>>(initialData);
  private _sandboxes$ = new BehaviorSubject<EntityData<SandboxId, Sandbox>>(initialData);
  private _styles$ = new BehaviorSubject<EntityData<StyleId, Style>>(initialData);
  private _sonatas$ = new BehaviorSubject<EntityData<SonataId, Sonata>>(initialData);
  private _sounds$ = new BehaviorSubject<EntityData<SoundId, Sound>>(initialData);
  private _shapes$ = new BehaviorSubject<EntityData<ShapeId, Shape>>(initialData);

  private _modules$ = new BehaviorSubject<EntityData<ModuleId, Module>>(initialData);
  private _setups$ = new BehaviorSubject<EntityData<SetupId, Setup>>(initialData);

  private _versions$ = new BehaviorSubject<EntityData<VersionId, Version>>(initialData);
  private _games$ = new BehaviorSubject<EntityData<GameId, Game>>(initialData);

  readonly animations$ = this._animations$.asObservable();
  readonly tokens$ = this._tokens$.asObservable();
  readonly widgets$ = this._widgets$.asObservable().pipe(
    map(widgets => Array.from(widgets.byId.values()))
  );
  readonly texts$ = this._texts$.asObservable();
  readonly images$ = this._images$.asObservable();
  readonly expressions$ = this._expressions$.asObservable();
  readonly sandboxes$ = this._sandboxes$.asObservable();
  readonly modules$ = this._modules$.asObservable();
  readonly setups$ = this._setups$.asObservable();
  readonly versions$ = this._versions$.asObservable();
  readonly games$ = this._games$.asObservable();
  readonly shapes$ = this._shapes$.asObservable();
  readonly sounds$ = this._sounds$.asObservable();
  readonly sonatas$ = this._sonatas$.asObservable();
  readonly styles$ = this._styles$.asObservable();

  nodes: Map<WidgetNodeId, WidgetNode> = new Map();
  loaded_modules: Set<ModuleId> = new Set();

  constructor(
    private api: GameEditService,
    private fetcher: GameFetchService,
  ) {
    this.widgets$
      .pipe(
        map(widgets => {
          widgets.forEach(widget => {
            widget.nodes.forEach(node => {
              this.nodes.set(node.id, node);
            });
          });
        })
      )
      .subscribe();
  }

  saveItem(item: GameEntity, game?: Game): Observable<GameEntity> {
    switch (item.__tag) {
      case 'Version': return this.api.saveVersion(item).pipe(
        tap(version => {
          const versions = this._versions$.getValue();
          versions.byId.set(version.id, version);
          this._versions$.next({ ...versions });
        })
      )
      case 'Widget': return this.api.saveWidget(item).pipe(
        tap(widget => {
          const widgets = this._widgets$.getValue();
          widgets.byId.set(widget.id, widget);
          this._widgets$.next({ ...widgets });
        })
      )
      case 'WidgetNode': return this.api.saveNode(item).pipe(
        tap(node => {
          const widgets = this._widgets$.getValue();
          const parentWidget = widgets.byId.get(node.owner);
          if (!parentWidget) {
            throw throwError(new Error());
          }
        })
      )
      case 'NodeHandler': {
        const parentNode = this.nodes.get(item.owner);
        if (!parentNode) {
          return throwError(new Error('Parent node not found: ' + item.owner));
        }
        const updatedNode = WidgetNode.saveHandler(parentNode, item);
        return this.saveItem(updatedNode);
      }
      case 'NodeLifecycle': {
        const parentNode = this.nodes.get(item.owner);
        if (!parentNode) {
          return throwError(new Error('Parent node not found: ' + item.owner));
        }
        const updatedNode = WidgetNode.saveLifecycle(parentNode, item);
        return this.saveItem(updatedNode);
      }
      case 'Token': return this.api.saveToken(item).pipe(
        tap(token => {
          const tokens = this._tokens$.getValue();
          tokens.byId.set(token.id, token);
          this._tokens$.next({ ...tokens });
        })
      )
      case 'TokenNode': {
        const tokens = this._tokens$.getValue();
        const parentToken = tokens.byId.get(item.owner);
        if (!parentToken) {
          return throwError('Parent token not found: ' + item.owner);
        }
        const updatedToken = Token.saveNode(parentToken, item);
        return this.saveItem(updatedToken);
      }
      case 'Text': return this.api.saveText(item).pipe(
        tap(text => {
          const texts = this._texts$.getValue();
          texts.byId.set(text.id, text);
          this._texts$.next({ ...texts });
        })
      )
      case 'Translation': {
        const texts = this._texts$.getValue();
        const parentText = texts.byId.get(item.owner);
        if (!parentText) {
          return throwError('Parent text not found: ' + item.owner);
        }
        const updatedText = Text.saveTranslation(parentText, item);
        return this.saveItem(updatedText);
      }
      case 'ImageAsset': return this.api.saveImage(item).pipe(
        tap(image => {
          const images = this._images$.getValue();
          images.byId.set(image.id, image);
          this._images$.next({ ...images });
        })
      )
      case 'Style': return this.api.saveStyle(item).pipe(
        tap(style => {
          const styles = this._styles$.getValue();
          styles.byId.set(style.id, style);
          this._styles$.next({ ...styles });
        })
      )
      case 'Sound': return this.api.saveSound(item).pipe(
        tap(sound => {
          const sounds = this._sounds$.getValue();
          sounds.byId.set(sound.id, sound);
          this._sounds$.next({ ...sounds });
        })
      )
      case 'Sonata': return this.api.saveSonata(item).pipe(
        tap(sonata => {
          const sonatas = this._sonatas$.getValue();
          sonatas.byId.set(sonata.id, sonata);
          this._sonatas$.next({ ...sonatas });
        })
      )
      case 'SonataStep': {
        const parentSonata = this._sonatas$.getValue().byId.get(item.owner);
        if (!parentSonata) {
          return throwError(new Error('Parent sonata not found: ' + item.owner));
        }
        const updatedSonata = Sonata.saveStep(parentSonata, item);
        return this.saveItem(updatedSonata);
      }
      case 'Shape': return this.api.saveShape(item).pipe(
        tap(shape => {
          const shapes = this._shapes$.getValue();
          shapes.byId.set(shape.id, shape);
          this._shapes$.next({ ...shapes });
        })
      )
      case 'ShapePoint': {
        const parentShape = this._shapes$.getValue().byId.get(item.owner);
        if (!parentShape) {
          return throwError(new Error('Parent shape not found: ' + item.owner));
        }
        const updatedShape = Shape.savePoint(parentShape, item);
        return this.saveItem(updatedShape);
      }
      case 'Expression': return this.api.saveExpression(item).pipe(
        tap(expression => {
          const expressions = this._expressions$.getValue();
          expressions.byId.set(expression.id, expression);
          this._expressions$.next({ ...expressions });
          return expression;
        })
      )
      case 'Animation': return this.api.saveAnimation(item).pipe(
        tap(animation => {
          const animations = this._animations$.getValue();
          animations.byId.set(animation.id, animation);
          this._animations$.next({ ...animations });
        })
      )
      case 'AnimationStep': {
        const parentAnimation = this._animations$.getValue().byId.get(item.owner);
        if (!parentAnimation) {
          return throwError(new Error('Parent animation not found: ' + item.owner));
        }
        const updatedAnimation = Animation.saveStep(parentAnimation, item);
        return this.saveItem(updatedAnimation);
      }
      case 'Module': return this.api.saveModule(item).pipe(
        tap(module => {
          const modules = this._modules$.getValue();
          modules.byId.set(module.id, module);
          this._modules$.next({ ...modules });
        })
      )
      case 'Setup': return this.api.saveSetup(item).pipe(
        tap(setup => {
          const setups = this._setups$.getValue();
          setups.byId.set(setup.id, setup);
          this._setups$.next({ ...setups });
        })
      )
      case 'Sandbox': return this.api.saveSandbox(item).pipe(
        tap(sandbox => {
          const sandboxes = this._sandboxes$.getValue();
          sandboxes.byId.set(sandbox.id, sandbox);
          this._sandboxes$.next({ ...sandboxes });
          return sandbox;
        })
      )
      case 'Game': return this.api.saveGame(item).pipe(
        tap(game => {
          const games = this._games$.getValue();
          games.byId.set(game.id, game);
          this._games$.next({ ...games });
        })
      )
      case 'GameLanguage':
        if (!game) {
          return throwError(new Error('Game must be provided when saving a language'));
        }
        const updatedGame = Game.saveLanguage(game, item);
        return this.api.saveGame(updatedGame).pipe(
          tap(result => {
            const games = this._games$.getValue();
            games.byId.set(result.id, result);
            this._games$.next({ ...games });
          })
        )
    }
  }

  deleteItem(item: GameEntity, game?: Game):
    Observable<unknown> {

    switch (item.__tag) {
      case 'Version': return this.api.deleteVersion(item).pipe(
        tap(() => {
          const versions = this._versions$.getValue();
          versions.byId.delete(item.id);
          this._versions$.next({ ...versions });
        })
      )
      case 'Widget': return this.api.deleteWidget(item).pipe(
        tap(() => {
          const widgets = this._widgets$.getValue();
          widgets.byId.delete(item.id);
          this._widgets$.next({ ...widgets });
        })
      )
      case 'WidgetNode': return this.api.deleteNode(item).pipe(
        tap(() => {
          const parentWidget = this._widgets$.getValue().byId.get(item.owner);
          if (!parentWidget) {
            return throwError(new Error('Parent widget not found: ' + item.owner));
          }
          const updatedWidget = Widget.removeNode(parentWidget, item);
          const widgets = this._widgets$.getValue();
          widgets.byId.delete(updatedWidget.id);
          this._widgets$.next({ ...widgets });
        })
      )
      case 'NodeHandler': {
        const parentNode = this.nodes.get(item.owner);
        if (!parentNode) {
          return throwError(new Error('Parent node not found: ' + item.owner));
        }
        const updatedNode = WidgetNode.removeHandler(parentNode, item);
        return this.saveItem(updatedNode);
      }
      case 'NodeLifecycle': {
        const parentNode = this.nodes.get(item.owner);
        if (!parentNode) {
          return throwError(new Error('Parent node not found: ' + item.owner));
        }
        const updatedNode = WidgetNode.removeLifecycle(parentNode, item);
        return this.saveItem(updatedNode);
      }
      case 'Token': return this.api.deleteToken(item).pipe(
        tap(() => {
          const tokens = this._tokens$.getValue();
          tokens.byId.delete(item.id);
          this._tokens$.next({ ...tokens });
        })
      )
      case 'TokenNode': {
        const parentToken = this._tokens$.getValue().byId.get(item.owner);
        if (!parentToken) {
          return throwError(new Error('Parent token not found: ' + item.owner));
        }
        const updatedToken = Token.removeNode(parentToken, item);
        return this.saveItem(updatedToken);
      }
      case 'Text': return this.api.deleteText(item).pipe(
        map(() => {
          const texts = this._texts$.getValue();
          texts.byId.delete(item.id);
          this._texts$.next({ ...texts });
        })
      )
      case 'Translation': {
        const parentText = this._texts$.getValue().byId.get(item.owner);
        if (!parentText) {
          return throwError(new Error('Parent text not found: ' + item.owner));
        }
        const updatedText = Text.removeTranslation(parentText, item);
        return this.saveItem(updatedText);
      }
      case 'ImageAsset': return this.api.deleteImage(item).pipe(
        map(() => {
          const images = this._images$.getValue();
          images.byId.delete(item.id);
          this._images$.next({ ...images });
        })
      )
      case 'Style': return this.api.deleteStyle(item).pipe(
        map(() => {
          const styles = this._styles$.getValue();
          styles.byId.delete(item.id);
          this._styles$.next({ ...styles });
        })
      )
      case 'Sound': return this.api.deleteSound(item).pipe(
        map(() => {
          const sounds = this._sounds$.getValue();
          sounds.byId.delete(item.id);
          this._sounds$.next({ ...sounds });
        })
      )
      case 'Sonata': return this.api.deleteSonata(item).pipe(
        map(() => {
          const sonatas = this._sonatas$.getValue();
          sonatas.byId.delete(item.id);
          this._sonatas$.next({ ...sonatas });
        })
      )
      case 'SonataStep': {
        const parentSonata = this._sonatas$.getValue().byId.get(item.owner);
        if (!parentSonata) {
          return throwError(new Error("Parent sonata not found: " + item.id));
        }
        const updatedSonata = Sonata.removeStep(parentSonata, item);
        return this.saveItem(updatedSonata);
      }
      case 'Shape': return this.api.deleteShape(item).pipe(
        map(() => {
          const shapes = this._shapes$.getValue();
          shapes.byId.delete(item.id);
          this._shapes$.next({ ...shapes });
        })
      )
      case 'ShapePoint': {
        const parentShape = this._shapes$.getValue().byId.get(item.owner);
        if (!parentShape) {
          return throwError(new Error('Parent shape not found: ' + item.owner));
        }
        const updatedShape = Shape.removePoint(parentShape, item);
        return this.saveItem(updatedShape);
      }
      case 'Expression': return this.api.deleteExpression(item).pipe(
        map(() => {
          const expressions = this._expressions$.getValue();
          expressions.byId.delete(item.id);
          this._expressions$.next({ ...expressions });
        })
      )
      case 'Animation': return this.api.deleteAnimation(item).pipe(
        map(() => {
          const animations = this._animations$.getValue();
          animations.byId.delete(item.id);
          this._animations$.next({ ...animations });
        })
      )
      case 'AnimationStep': {
        const parentAnimation = this._animations$.getValue().byId.get(item.owner);
        if (!parentAnimation) {
          return throwError(new Error('Parent animation not found: ' + item.owner))
        }
        const updatedAnimation = Animation.removeStep(parentAnimation, item);
        return this.saveItem(updatedAnimation);
      }
      case 'Module': return this.api.deleteModule(item).pipe(
        map(() => {
          const modules = this._modules$.getValue();
          modules.byId.delete(item.id);
          this._modules$.next({ ...modules });
        })
      )
      case 'Setup': return this.api.deleteSetup(item).pipe(
        map(() => {
          const setups = this._setups$.getValue();
          setups.byId.delete(item.id);
          this._setups$.next({ ...setups });
        })
      )
      case 'Sandbox': return this.api.deleteSandbox(item).pipe(
        map(() => {
          const sandboxes = this._sandboxes$.getValue();
          sandboxes.byId.delete(item.id);
          this._sandboxes$.next({ ...sandboxes });
        })
      )
      case 'Game': return this.api.deleteGame(item).pipe(
        map(() => {
          const games = this._games$.getValue();
          games.byId.delete(item.id);
          this._games$.next({ ...games });
        })
      )
      case 'GameLanguage': {
        if (!game) {
          return throwError(new Error('Game not found'));
        }
        const updatedGame = Game.removeLanguage(game, item);
        return this.saveItem(updatedGame);
      }
    }
  }

  fetchItems(payload: FetchPayload): Observable<GameEntity[]> {
    switch (payload.entityType) {
      case 'ImageAsset': {
        return this.fetcher.getImages(payload.moduleId).pipe(
          tap(images => {
            const currentImages = this._images$.getValue();
            this._images$.next({
              ...currentImages,
              byId: arrayToMap(images, 'id')
            });
          })
        )
      }
      case 'Version': {
        return this.fetcher.getVersions(payload.gameId).pipe(
          tap(versions => {
            const currentVersions = this._versions$.getValue();
            this._versions$.next({
              ...currentVersions,
              byId: arrayToMap(versions, 'id')
            })
          })
        )
      }
      case 'Module': {
        return this.fetcher.getModules(payload.versionId).pipe(
          tap(modules => {
            const currentModules = this._modules$.getValue();
            this._modules$.next({
              ...currentModules,
              byId: arrayToMap(modules, 'id')
            });
          })
        )
      }
      case 'Setup':
        return this.fetcher.getSetups(payload.versionId).pipe(
          tap(setups => {
            const currentSetups = this._setups$.getValue();
            this._setups$.next({
              ...currentSetups,
              byId: arrayToMap(setups, 'id')
            });
          })
        )
      case 'Game': return this.fetcher.getGames().pipe(
        tap(games => {
          const currentGames = this._games$.getValue();
          this._games$.next({
            ...currentGames,
            byId: arrayToMap(games, 'id')
          });
        })
      )
      default:
        return throwError(new Error('Not supported entity type for fetch: ' + payload.entityType));
    }
  }

  fetchGameData(payload: { gameId: GameId, module: Module, versionId: VersionId }): Observable<GameData | null> {
    const { gameId, module } = payload;
    const { loaded_modules } = this;

    const moduleIds = [...module.dependencies, module.id].filter(moduleId => !loaded_modules.has(moduleId));

    if (moduleIds.length) {
      return this.fetcher.getGameData(gameId, moduleIds).pipe(
        tap(response => {
          moduleIds.forEach(id => loaded_modules.add(id));

          this._images$.next({ byId: arrayToMap(response.images, 'id') });
          this._animations$.next({ byId: arrayToMap(response.animations, 'id') });
          this._texts$.next({ byId: arrayToMap(response.texts, 'id') });
          this._tokens$.next({ byId: arrayToMap(response.tokens, 'id') });
          this._widgets$.next({ byId: arrayToMap(response.widgets, 'id') });
          this._sounds$.next({ byId: arrayToMap(response.sounds, 'id') });
          this._sonatas$.next({ byId: arrayToMap(response.sonatas, 'id') });
          this._expressions$.next({ byId: arrayToMap(response.expressions, 'id') });
          this._styles$.next({ byId: arrayToMap(response.styles, 'id') });
          this._shapes$.next({ byId: arrayToMap(response.shapes, 'id') });
          this._sandboxes$.next({ byId: arrayToMap(response.sandboxes, 'id') });
        }),
      )
    }

    return of(null);

  }
}


