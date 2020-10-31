import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { AppState, GameEditService, GameFetchService } from '@app/core';
import { STORE_KEYS, Token, Widget, Text, Animation, Sonata, Shape, WidgetNode } from '@app/game-mechanics';

import { EditorGenericMutators, genericActionTypes, SaveItem, SetItem, SetItems } from '../actions';
import { getIndexedNodes, selectForm } from '../selectors';


@Injectable()
export class GenericEffectsService {

  constructor(
    private actions$: Actions,
    private api: GameEditService,
    private fetcher: GameFetchService,
    private snackbar: MatSnackBar,
    private store: Store<AppState>
  ) {
  }

  @Effect() saveItem: Observable<EditorGenericMutators> = this.actions$.pipe(
    ofType<SaveItem>(genericActionTypes.SAVE_ITEM),
    withLatestFrom(this.store.select(selectForm), this.store.select(getIndexedNodes)),
    switchMap(([action, entities, indexedNodes]) => {
      const item = action.payload.item;

      switch (item.__tag) {
        case 'Widget': return this.api.saveWidget(item).pipe(
          map(widget => new SetItem({ item: widget, storeKey: STORE_KEYS.widgets }))
        )
        case 'WidgetNode': return this.api.saveNode(item).pipe(
          map(node => {
            const parentWidget = entities.widgets.byId.get(node.owner);
            const updatedWidget = Widget.saveNode(parentWidget, node);
            return new SetItem({ item: updatedWidget, storeKey: STORE_KEYS.widgets });
          })
        )
        case 'NodeHandler': {
          const parentNode = indexedNodes.get(item.owner);
          const updatedNode = WidgetNode.saveHandler(parentNode, item);
          return of(new SaveItem({ item: updatedNode }));
        }
        case 'NodeLifecycle': {
          const parentNode = indexedNodes.get(item.owner);
          const updatedNode = WidgetNode.saveLifecycle(parentNode, item);
          return of(new SaveItem({ item: updatedNode }));
        }
        case 'Token': return this.api.saveToken(item).pipe(
          map(token => new SetItem({ item: token, storeKey: STORE_KEYS.tokens }))
        )
        case 'TokenNode': {
          const parentToken = entities.tokens.byId.get(item.owner);
          const updatedToken = Token.saveNode(parentToken, item);
          return this.api.saveToken(updatedToken).pipe(
            map(token => new SetItem({ item: token, storeKey: STORE_KEYS.tokens }))
          )
        }
        case 'Text': return this.api.saveText(item).pipe(
          map(text => new SetItem({ item: text, storeKey: STORE_KEYS.texts }))
        )
        case 'Translation': {
          const parentText = entities.texts.byId.get(item.owner);
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
          const parentSonata = entities.sonatas.byId.get(item.owner);
          const updatedSonata = Sonata.saveStep(parentSonata, item);
          return this.api.saveSonata(updatedSonata).pipe(
            map(sonata => new SetItem({ item: sonata, storeKey: STORE_KEYS.sonatas }))
          )
        }
        case 'Shape': return this.api.saveShape(item).pipe(
          map(shape => new SetItem({ item: shape, storeKey: STORE_KEYS.shapes }))
        )
        case 'ShapePoint': {
          const parentShape = entities.shapes.byId.get(item.owner);
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
          const parentAnimation = entities.animations.byId.get(item.owner);
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
      }
    }),
    map(action => {
      this.snackbar.open(`${action.payload.item.__tag} was saved`);
      return action;
    }),
    catchError(err => {
      this.snackbar.open(`Item was not saved`);
      return [];
    })
  )

}
