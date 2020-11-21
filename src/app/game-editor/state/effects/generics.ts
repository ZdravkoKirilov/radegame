import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { get } from 'lodash';

import { AppState, GameEditService, GameFetchService } from '@app/core';
import { Token, Widget, Text, Animation, Sonata, Shape, WidgetNode, WidgetId, TokenId, TextId, SonataId, ShapeId, AnimationId, Game } from '@app/game-mechanics';
import { Dictionary } from '@app/shared';

import { DeleteItem, EditorGenericMutators, FetchModularItems, FetchVersionedItems, genericActionTypes, RemoveItem, SaveItem, SetGameAction, SetItem, SetItems } from '../actions';
import { getIndexedNodes, selectForm, selectGame } from '../selectors';
import { STORE_KEYS } from '../../utils';


@Injectable()
export class GenericEffectsService {

  constructor(
    private actions$: Actions,
    private api: GameEditService,
    private fetcher: GameFetchService,
    private snackbar: MatSnackBar,
    private store: Store<AppState>
  ) { }

  @Effect() saveItem = this.actions$.pipe(
    ofType<SaveItem>(genericActionTypes.SAVE_ITEM),
    withLatestFrom(this.store.select(selectForm), this.store.select(getIndexedNodes), this.store.select(selectGame)),
    switchMap(([action, entities, indexedNodes, game]) => {
      const item = action.payload.item;

      switch (item.__tag) {
        case 'Widget': return this.api.saveWidget(item).pipe(
          map(widget => new SetItem({ item: widget, storeKey: STORE_KEYS.widgets }))
        )
        case 'WidgetNode': return this.api.saveNode(item).pipe(
          map(node => {
            const parentWidget = get<Dictionary<Widget>, WidgetId>(entities.widgets.byId, node.owner);
            const updatedWidget = Widget.saveNode(parentWidget, node);
            return new SetItem({ item: updatedWidget, storeKey: STORE_KEYS.widgets });
          })
        )
        case 'NodeHandler': {
          const parentNode = indexedNodes[item.owner];
          const updatedNode = WidgetNode.saveHandler(parentNode, item);
          return of(new SaveItem({ item: updatedNode }));
        }
        case 'NodeLifecycle': {
          const parentNode = indexedNodes[item.owner];
          const updatedNode = WidgetNode.saveLifecycle(parentNode, item);
          return of(new SaveItem({ item: updatedNode }));
        }
        case 'Token': return this.api.saveToken(item).pipe(
          map(token => new SetItem({ item: token, storeKey: STORE_KEYS.tokens }))
        )
        case 'TokenNode': {
          const parentToken = get<Dictionary<Token>, TokenId>(entities.tokens.byId, item.owner);
          const updatedToken = Token.saveNode(parentToken, item);
          return this.api.saveToken(updatedToken).pipe(
            map(token => new SetItem({ item: token, storeKey: STORE_KEYS.tokens }))
          )
        }
        case 'Text': return this.api.saveText(item).pipe(
          map(text => new SetItem({ item: text, storeKey: STORE_KEYS.texts }))
        )
        case 'Translation': {
          const parentText = get<Dictionary<Text>, TextId>(entities.texts.byId, item.owner);
          const updatedText = Text.saveTranslation(parentText, item);
          return this.api.saveText(updatedText).pipe(
            map(text => new SetItem({ item: text, storeKey: STORE_KEYS.texts }))
          )
        }
        case 'ImageAsset': return this.api.saveImage(item).pipe(
          map(image => new SetItem({ item: image, storeKey: STORE_KEYS.images }))
        )
        case 'Style': return this.api.saveStyle(item).pipe(
          map(style => new SetItem({ item: style, storeKey: STORE_KEYS.styles }))
        )
        case 'Sound': return this.api.saveSound(item).pipe(
          map(sound => new SetItem({ item: sound, storeKey: STORE_KEYS.sounds }))
        )
        case 'Sonata': return this.api.saveSonata(item).pipe(
          map(sonata => new SetItem({ item: sonata, storeKey: STORE_KEYS.sonatas }))
        )
        case 'SonataStep': {
          const parentSonata = get<Dictionary<Sonata>, SonataId>(entities.sonatas.byId, item.owner);
          const updatedSonata = Sonata.saveStep(parentSonata, item);
          return this.api.saveSonata(updatedSonata).pipe(
            map(sonata => new SetItem({ item: sonata, storeKey: STORE_KEYS.sonatas }))
          )
        }
        case 'Shape': return this.api.saveShape(item).pipe(
          map(shape => new SetItem({ item: shape, storeKey: STORE_KEYS.shapes }))
        )
        case 'ShapePoint': {
          const parentShape = get<Dictionary<Shape>, ShapeId>(entities.shapes.byId, item.owner);
          const updatedShape = Shape.savePoint(parentShape, item);
          return this.api.saveShape(updatedShape).pipe(
            map(shape => new SetItem({ item: shape, storeKey: STORE_KEYS.shapes }))
          )
        }
        case 'Expression': return this.api.saveExpression(item).pipe(
          map(expression => new SetItem({ item: expression, storeKey: STORE_KEYS.expressions }))
        )
        case 'Animation': return this.api.saveAnimation(item).pipe(
          map(animation => new SetItem({ item: animation, storeKey: STORE_KEYS.animations }))
        )
        case 'AnimationStep': {
          const parentAnimation = get<Dictionary<Animation>, AnimationId>(entities.animations.byId, item.owner);
          const updatedAnimation = Animation.saveStep(parentAnimation, item);
          return this.api.saveAnimation(updatedAnimation).pipe(
            map(animation => new SetItem({ item: animation, storeKey: STORE_KEYS.animations }))
          )
        }
        case 'Module': return this.api.saveModule(item).pipe(
          map(module => new SetItem({ item: module, storeKey: STORE_KEYS.modules }))
        )
        case 'Setup': return this.api.saveSetup(item).pipe(
          map(setup => new SetItem({ item: setup, storeKey: STORE_KEYS.setups }))
        )
        case 'Sandbox': return this.api.saveSandbox(item).pipe(
          map(sandbox => new SetItem({ item: sandbox, storeKey: STORE_KEYS.sandboxes }))
        )
        case 'GameLanguage':
          const updatedGame = Game.saveLanguage(game!, item);
          return this.api.saveGame(updatedGame).pipe(
            map(result => new SetGameAction({ game: result }))
          )
      }
    }),
    tap(action => {
      const identifier = 'item' in action.payload ? action.payload.item.__tag : 'GameLanguage';
      this.snackbar.open(`${identifier} was saved`, 'Success', { duration: 3000 });
    }),
    catchError(() => {
      this.snackbar.open(`Item was not saved`, 'Error', { duration: 3000 });
      return [];
    })
  )

  @Effect() deleteItem = this.actions$.pipe(
    ofType<DeleteItem>(genericActionTypes.DELETE_ITEM),
    withLatestFrom(this.store.select(selectForm), this.store.select(getIndexedNodes), this.store.select(selectGame)),
    switchMap(([action, entities, indexedNodes, game]) => {
      const item = action.payload.item;

      switch (item.__tag) {
        case 'Widget': return this.api.deleteWidget(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.widgets }))
        )
        case 'WidgetNode': return this.api.deleteNode(item).pipe(
          map(() => {
            const parentWidget = get<Dictionary<Widget>, WidgetId>(entities.widgets.byId, item.owner);
            const updatedWidget = Widget.removeNode(parentWidget, item);
            return new SetItem({ item: updatedWidget, storeKey: STORE_KEYS.widgets });
          })
        )
        case 'NodeHandler': {
          const parentNode = indexedNodes[item.owner];
          const updatedNode = WidgetNode.removeHandler(parentNode, item);
          return of(new SaveItem({ item: updatedNode }));
        }
        case 'NodeLifecycle': {
          const parentNode = indexedNodes[item.owner];
          const updatedNode = WidgetNode.removeLifecycle(parentNode, item);
          return of(new SaveItem({ item: updatedNode }));
        }
        case 'Token': return this.api.deleteToken(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.tokens }))
        )
        case 'TokenNode': {
          const parentToken = get<Dictionary<Token>, TokenId>(entities.tokens.byId, item.owner);
          const updatedToken = Token.removeNode(parentToken, item);
          return this.api.saveToken(updatedToken).pipe(
            map(token => new SetItem({ item: token, storeKey: STORE_KEYS.tokens }))
          )
        }
        case 'Text': return this.api.deleteText(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.texts }))
        )
        case 'Translation': {
          const parentText = get<Dictionary<Text>, TextId>(entities.texts.byId, item.owner);
          const updatedText = Text.removeTranslation(parentText, item);
          return this.api.saveText(updatedText).pipe(
            map(text => new SetItem({ item: text, storeKey: STORE_KEYS.texts }))
          )
        }
        case 'ImageAsset': return this.api.deleteImage(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.images }))
        )
        case 'Style': return this.api.deleteStyle(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.styles }))
        )
        case 'Sound': return this.api.deleteSound(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.sounds }))
        )
        case 'Sonata': return this.api.deleteSonata(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.sonatas }))
        )
        case 'SonataStep': {
          const parentSonata = get<Dictionary<Sonata>, SonataId>(entities.sonatas.byId, item.owner);
          const updatedSonata = Sonata.removeStep(parentSonata, item);
          return this.api.saveSonata(updatedSonata).pipe(
            map(sonata => new SetItem({ item: sonata, storeKey: STORE_KEYS.sonatas }))
          )
        }
        case 'Shape': return this.api.deleteShape(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.shapes }))
        )
        case 'ShapePoint': {
          const parentShape = get<Dictionary<Shape>, ShapeId>(entities.shapes.byId, item.owner);
          const updatedShape = Shape.removePoint(parentShape, item);
          return this.api.saveShape(updatedShape).pipe(
            map(shape => new SetItem({ item: shape, storeKey: STORE_KEYS.shapes }))
          )
        }
        case 'Expression': return this.api.deleteExpression(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.expressions }))
        )
        case 'Animation': return this.api.deleteAnimation(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.animations }))
        )
        case 'AnimationStep': {
          const parentAnimation = get<Dictionary<Animation>, AnimationId>(entities.animations.byId, item.owner);
          const updatedAnimation = Animation.removeStep(parentAnimation, item);
          return this.api.saveAnimation(updatedAnimation).pipe(
            map(animation => new SetItem({ item: animation, storeKey: STORE_KEYS.animations }))
          )
        }
        case 'Module': return this.api.deleteModule(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.modules }))
        )
        case 'Setup': return this.api.deleteSetup(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.setups }))
        )
        case 'Sandbox': return this.api.deleteSandbox(item).pipe(
          map(() => new RemoveItem({ item, storeKey: STORE_KEYS.sandboxes }))
        )
        case 'GameLanguage':
          const updatedGame = Game.removeLanguage(game!, item);
          return this.api.saveGame(updatedGame).pipe(
            map(result => new SetGameAction({ game: result }))
          )
      }
    }),
    tap(action => {
      const msg = `${'item' in action.payload ? action.payload.item.__tag : 'GameLanguage'} was deleted`;
      this.snackbar.open(msg, 'Success', { duration: 3000 });
    }),
    catchError(() => {
      this.snackbar.open(`Item was not deleted`, 'Error', { duration: 3000 });
      return [];
    })
  )

  @Effect() fetchVersionedItems: Observable<EditorGenericMutators> = this.actions$.pipe(
    ofType<FetchVersionedItems>(genericActionTypes.FETCH_VERSIONED_ITEMS),
    switchMap((action) => {
      const { entityType, versionId } = action.payload;

      switch (entityType) {
        case 'Module': return this.fetcher.getModules(versionId).pipe(
          map(modules => new SetItems({ storeKey: STORE_KEYS.modules, items: modules }))
        )
        case 'Setup': return this.fetcher.getSetups(versionId).pipe(
          map(setups => new SetItems({ storeKey: STORE_KEYS.setups, items: setups }))
        )
      }
    }),
    tap(action => {
      this.snackbar.open(`${action.payload.storeKey} data fetched`, 'Success', { duration: 3000 });
    }),
    catchError(() => {
      this.snackbar.open("Couldn't fetch items", 'Error', { duration: 3000 });
      return [];
    })
  )

  @Effect() fetchModularItems = this.actions$.pipe(
    ofType<FetchModularItems>(genericActionTypes.FETCH_MODULAR_ITEMS),
    switchMap(action => {
      const { entityType, moduleId } = action.payload;

      switch (entityType) {
        case 'Widget': return this.fetcher.getWidgets(moduleId).pipe(
          map(widgets => new SetItems({ storeKey: STORE_KEYS.widgets, items: widgets }))
        )
        case 'ImageAsset': return this.fetcher.getImages(moduleId).pipe(
          map(images => new SetItems({ storeKey: STORE_KEYS.images, items: images }))
        )
        case 'Token': return this.fetcher.getTokens(moduleId).pipe(
          map(tokens => new SetItems({ storeKey: STORE_KEYS.tokens, items: tokens }))
        )
        case 'Animation': return this.fetcher.getAnimations(moduleId).pipe(
          map(animations => new SetItems({ storeKey: STORE_KEYS.animations, items: animations }))
        )
        case 'Sandbox': return this.fetcher.getSandboxes(moduleId).pipe(
          map(sandboxes => new SetItems({ storeKey: STORE_KEYS.sandboxes, items: sandboxes }))
        )
        case 'Expression': return this.fetcher.getExpressions(moduleId).pipe(
          map(expressions => new SetItems({ storeKey: STORE_KEYS.expressions, items: expressions }))
        )
        default:
          throw new Error('Unrecognized input provided to fetchModularItems: ' + JSON.stringify(action))
      }
    }),
    tap(action => {
      this.snackbar.open(`${action.payload.storeKey} data fetched`, 'Success', { duration: 3000 });
    }),
    catchError(() => {
      this.snackbar.open(`Couldn't fetch items`, 'Error', { duration: 3000 });
      return [];
    })
  )

}
