import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { GameEditService, GameFetchService } from '@app/core';
import {
  GameEntity, Module, Token, Choice, ImageAsset, Widget, WidgetNode, Style, Setup,
  AllEntity, ALL_ENTITIES, Transition, Animation, Sonata, Text, Shape, Sandbox, Sound, Expression, EntityId, GameId
} from '@app/game-mechanics';
import { toDictionary } from '@app/shared';

import {
  actionTypes, SetItemsAction, FetchItemsSuccessAction, FetchItemAction, FetchItemSuccessAction, FetchItemPayload, PayloadWithItem, ResponseWithEntities, SaveItemAction, SaveItemSuccessAction, SetItemAction, DeleteItemAction,
  DeleteItemSuccessAction, RemoveItemAction, FetchItemsAction
} from '../actions';

@Injectable()
export class GenericEffectsService {

  constructor(private actions$: Actions, private api: GameEditService, private fetcher: GameFetchService) {
  }

  @Effect() fetchItem: Observable<any> = this.actions$.pipe(
    ofType(actionTypes.FETCH_ITEM),
    map(payload => payload as FetchItemPayload<EntityId>),
    mergeMap(payload => {
      const { data, key } = payload;

      return this.fetchSingleItem(key, data.itemId, data.gameId).pipe(
        mergeMap((res: GameEntity) => {
          const response: PayloadWithItem<GameEntity> = {
            key, data: res,
          };
          return [
            new SetItemAction(response),
            new FetchItemSuccessAction(response),
          ];
        }),
        catchError(() => {
          return null;
          // notif
        })
      );

    })
  )

  @Effect() fetchItems: Observable<any> = this.actions$.pipe(
    ofType(actionTypes.FETCH_ITEMS),
    map((action: FetchItemsAction) => action.payload),
    mergeMap(payload => {
      const { key, data: { gameId } } = payload;

      return this.fetchRequest(key, gameId).pipe(
        mergeMap((res: GameEntity[]) => {
          const response: ResponseWithEntities<GameEntity> = {
            key, data: { entities: toDictionary(res, 'id') },
          };
          return [
            new SetItemsAction(response),
            new FetchItemsSuccessAction(response),
          ];
        }),
        catchError(() => {
          return null;
        })
      );

    })
  )

  @Effect() saveItem: Observable<any> = this.actions$.pipe(
    ofType(actionTypes.SAVE_ITEM),
    map((action: SaveItemAction<GameEntity>) => action.payload),
    switchMap(payload => {
      const { key, data } = payload;
      return this.saveRequest(key, data).pipe(
        mergeMap((res: GameEntity) => {
          const response: PayloadWithItem<GameEntity> = {
            key, data: res
          };
          return [
            new SetItemAction(response),
            new SaveItemSuccessAction(response),
            key === 'nodes' ? new FetchItemAction({
              key: ALL_ENTITIES.widgets, data: {
                gameId: data['game'],
                itemId: data['owner'],
              }
            }) : null
          ].filter(Boolean);
        }),
        catchError(() => {
          // return [new SaveItemFailAction()];
          return [];
        })
      );
    }),
  );

  @Effect() deleteItem: Observable<any> = this.actions$.pipe(
    ofType(actionTypes.DELETE_ITEM),
    map((action: DeleteItemAction<GameEntity>) => action.payload),
    mergeMap(payload => {
      const { key, data } = payload;

      return this.deleteRequest(key, data).pipe(
        mergeMap(() => {
          return [
            new DeleteItemSuccessAction(payload),
            new RemoveItemAction(payload),
            key === 'nodes' ? new FetchItemAction({
              key: ALL_ENTITIES.widgets, data: {
                gameId: data['game'],
                itemId: data['owner'],
              }
            }) : null,
          ].filter(Boolean);
        }),
        catchError(() => {
          // return of(new DeleteItemFailAction());
          return of(null);
        })
      );
    })
  );

  fetchSingleItem(key: AllEntity, itemId: EntityId, gameId: GameId) {
    switch (key) {
      case ALL_ENTITIES.widgets:
        return this.fetcher.getWidget(gameId, itemId);
      default:
        return of(null);
    }
  }

  fetchRequest(key: AllEntity, gameId: GameId): Observable<any[]> {
    switch (key) {
      case ALL_ENTITIES.modules:
        return this.fetcher.getModules(gameId);
      case ALL_ENTITIES.widgets:
        return this.fetcher.getWidgets(gameId);
      case ALL_ENTITIES.choices:
        return this.fetcher.getChoices(gameId);
      case ALL_ENTITIES.tokens:
        return this.fetcher.getTokens(gameId);
      case ALL_ENTITIES.images:
        return this.fetcher.getImages(gameId);
      case ALL_ENTITIES.sandboxes:
        return this.fetcher.getSandboxes(gameId);
      default:
        return of(null);
    }
  };

  saveRequest(key: AllEntity, entity: GameEntity): Observable<GameEntity> {
    switch (key) {
      case ALL_ENTITIES.sandboxes:
        return this.api.saveSandbox(<Sandbox>entity);
      case ALL_ENTITIES.modules:
        return this.api.saveModule(<Module>entity);
      case ALL_ENTITIES.widgets:
        return this.api.saveWidget(<Widget>entity);
      case ALL_ENTITIES.nodes:
        return this.api.saveNode(<WidgetNode>entity);
      case ALL_ENTITIES.choices:
        return this.api.saveChoice(<Choice>entity);
      case ALL_ENTITIES.tokens:
        return this.api.saveToken(<Token>entity);
      case ALL_ENTITIES.images:
        return this.api.saveImage(<ImageAsset>entity);
      case ALL_ENTITIES.styles:
        return this.api.saveStyle(<Style>entity);
      case ALL_ENTITIES.sounds:
        return this.api.saveSound(<Sound>entity);
      case ALL_ENTITIES.expressions:
        return this.api.saveExpression(<Expression>entity);
      case ALL_ENTITIES.animations:
        return this.api.saveAnimation(<Animation>entity);
      case ALL_ENTITIES.setups:
        return this.api.saveSetup(<Setup>entity);
      case ALL_ENTITIES.transitions:
        return this.api.saveTransition(<Transition>entity);
      case ALL_ENTITIES.texts:
        return this.api.saveText(<Text>entity);
      case ALL_ENTITIES.sonatas:
        return this.api.saveSonata(<Sonata>entity);
      case ALL_ENTITIES.shapes:
        return this.api.saveShape(<Shape>entity);
      default:
        return of(null);
    }
  };

  deleteRequest(key: AllEntity, entity: GameEntity): Observable<GameEntity> {
    switch (key) {
      case ALL_ENTITIES.sandboxes:
        return this.api.deleteSandbox(<Sandbox>entity);
      case ALL_ENTITIES.modules:
        return this.api.deleteModule(<Module>entity);
      case ALL_ENTITIES.widgets:
        return this.api.deleteWidget(<Widget>entity);
      case ALL_ENTITIES.nodes:
        return this.api.deleteNode(<WidgetNode>entity);
      case ALL_ENTITIES.choices:
        return this.api.deleteChoice(<Choice>entity);
      case ALL_ENTITIES.tokens:
        return this.api.deleteToken(<Token>entity);
      case ALL_ENTITIES.images:
        return this.api.deleteImage(<ImageAsset>entity);
      case ALL_ENTITIES.styles:
        return this.api.deleteStyle(<Style>entity);
      case ALL_ENTITIES.sounds:
        return this.api.deleteSound(<Sound>entity);
      case ALL_ENTITIES.expressions:
        return this.api.deleteExpression(<Expression>entity);
      case ALL_ENTITIES.animations:
        return this.api.deleteAnimation(<Animation>entity);
      case ALL_ENTITIES.setups:
        return this.api.deleteSetup(<Setup>entity);
      case ALL_ENTITIES.transitions:
        return this.api.deleteTransition(<Setup>entity);
      case ALL_ENTITIES.texts:
        return this.api.deleteText(<Text>entity);
      case ALL_ENTITIES.shapes:
        return this.api.deleteShape(<Shape>entity);
      case ALL_ENTITIES.sonatas:
        return this.api.deleteSonata(<Sonata>entity);
      default:
        return of(null);
    }
  }
}
