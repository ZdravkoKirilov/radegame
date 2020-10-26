import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GameEditService, GameFetchService } from '@app/core';
import {
  GameEntity, Module, Token, ImageAsset, Widget, WidgetNode, Style, Setup,
  AllEntity, ALL_ENTITIES, Animation, Sonata, Text, Shape, Sandbox, Sound, Expression, EntityId, GameId, toWidgetId, toGameId
} from '@app/game-mechanics';
import { toDictionary } from '@app/shared';

import {
  genericActionTypes, SetItemsAction, FetchItemsSuccessAction, FetchItemAction, FetchItemSuccessAction, FetchItemPayload, PayloadWithItem, ResponseWithEntities, SaveItemAction, SaveItemSuccessAction, SetItemAction, DeleteItemAction,
  DeleteItemSuccessAction, RemoveItemAction, FetchItemsAction, SaveSetup, SaveModule, DeleteSetup
} from '../actions';

@Injectable()
export class GenericEffectsService {

  constructor(private actions$: Actions, private api: GameEditService, private fetcher: GameFetchService, private snackbar: MatSnackBar) {
  }

  @Effect() fetchItem: Observable<any> = this.actions$.pipe(
    ofType(genericActionTypes.FETCH_ITEM),
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
    ofType(genericActionTypes.FETCH_ITEMS),
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

  @Effect() saveSetup = this.actions$.pipe(
    ofType<SaveSetup>(genericActionTypes.SAVE_SETUP),
    switchMap(action => this.api.saveSetup(action.payload.setup, toGameId(1)).pipe(
      mergeMap((createdSetup: Setup) => {
        const payload = {
          key: ALL_ENTITIES.setups,
          data: createdSetup,
        };
        return [
          new SetItemAction(payload),
          new SaveItemSuccessAction(payload),
        ];
      }),
      catchError(() => ([]))
    ))
  )

  @Effect() saveModule = this.actions$.pipe(
    ofType<SaveModule>(genericActionTypes.SAVE_MODULE),
    switchMap(action => this.api.saveModule(action.payload.module, toGameId(1)).pipe(
      mergeMap(createdModule => {
        const payload = {
          key: ALL_ENTITIES.modules,
          data: createdModule,
        };
        return [
          new SetItemAction(payload),
          new SaveItemSuccessAction(payload),
        ];
      }),
      catchError(() => ([]))
    ))
  )

  @Effect() saveItem: Observable<any> = this.actions$.pipe(
    ofType(genericActionTypes.SAVE_ITEM),
    map((action: SaveItemAction<GameEntity>) => action.payload),
    switchMap(payload => {
      const { key, data } = payload;
      return this.saveRequest(data, toGameId(1)).pipe(
        mergeMap((res: GameEntity) => {
          const response: PayloadWithItem<GameEntity> = {
            key, data: res
          };
          return [
            new SetItemAction(response),
            new SaveItemSuccessAction(response),
          /*   key === 'nodes' ? new FetchItemAction({
              key: "Widget", data: {
                gameId: data['game'],
                itemId: data['owner'],
              }
            }) : null */
          ].filter(Boolean);
        }),
        catchError(() => {
          // return [new SaveItemFailAction()];
          return [];
        })
      );
    }),
  );

  @Effect() deleteSetup = this.actions$.pipe(
    ofType<DeleteSetup>(genericActionTypes.DELETE_SETUP),
    map(action => action.payload),
    switchMap(payload => {
      return this.api.deleteSetup(payload.setup, toGameId(1)).pipe(
        mergeMap(() => {
          this.snackbar.open('Setup was deleted', 'Success', { duration: 3000 });

          return [
            new DeleteItemSuccessAction({
              key: ALL_ENTITIES.setups,
              data: payload.setup
            }),
            new RemoveItemAction({
              key: ALL_ENTITIES.setups,
              data: payload.setup
            }),
          ]
        }),
        catchError(() => {
          // return of(new DeleteItemFailAction());
          this.snackbar.open('Setup could not be deleted', 'Error', { duration: 3000 });
          return of(null);
        })
      )
    })
  )

  @Effect() deleteItem: Observable<any> = this.actions$.pipe(
    ofType(genericActionTypes.DELETE_ITEM),
    map((action: DeleteItemAction<GameEntity>) => action.payload),
    mergeMap(payload => {
      const { key, data } = payload;

      return this.deleteRequest(data, toGameId(1)).pipe(
        mergeMap(() => {
          return [
            new DeleteItemSuccessAction(payload),
            new RemoveItemAction(payload),
           /*  key === 'nodes' ? new FetchItemAction({
              key: "Widget", data: {
                gameId: data['game'],
                itemId: data['owner'],
              }
            }) : null, */
          ].filter(Boolean);
        }),
        catchError(() => {
          // return of(new DeleteItemFailAction());
          return of(null);
        })
      );
    })
  );

  fetchSingleItem(key: string, itemId: EntityId, gameId: GameId) {
    switch (key) {
      case "Widget":
        return this.fetcher.getWidget(gameId, toWidgetId(itemId));
      default:
        return of(null);
    }
  }

  fetchRequest(key: string, gameId: GameId): Observable<any[]> {
    switch (key) {
      case ALL_ENTITIES.modules:
        return this.fetcher.getModules(gameId);
      case ALL_ENTITIES.setups:
        return this.fetcher.getSetups(gameId);
      case "Widget":
        return this.fetcher.getWidgets(gameId);
      case ALL_ENTITIES.tokens:
        return this.fetcher.getTokens(gameId);
      case "ImageAsset":
        return this.fetcher.getImages(gameId);
      case "Sandbox":
        return this.fetcher.getSandboxes(gameId);
      default:
        return of(null);
    }
  };

  saveRequest(entity: GameEntity, gameId: GameId) {
    switch (entity.__tag) {
      case "Sandbox":
        return this.api.saveSandbox(entity, gameId);
      case "Module":
        return this.api.saveModule(entity, gameId);
      case "Widget":
        return this.api.saveWidget(entity, gameId);
      case "WidgetNode":
        return this.api.saveNode(entity, gameId);
      case "Token":
        return this.api.saveToken(entity, gameId);
      case "ImageAsset":
        return this.api.saveImage(entity, gameId);
      case "Style":
        return this.api.saveStyle(entity, gameId);
      case "Sound":
        return this.api.saveSound(entity, gameId);
      case "Expression":
        return this.api.saveExpression(entity, gameId);
      case "Animation":
        return this.api.saveAnimation(entity, gameId);
      case "Setup":
        return this.api.saveSetup(entity, gameId);
      case "Text":
        return this.api.saveText(entity, gameId);
      case "Sonata":
        return this.api.saveSonata(entity, gameId);
      case "Shape":
        return this.api.saveShape(entity, gameId);
      default:
        return of(null);
    }
  };

  deleteRequest(entity: GameEntity, gameId: GameId) {
    switch (entity.__tag) {
      case "Sandbox":
        return this.api.deleteSandbox(entity, gameId);
      case "Module":
        return this.api.deleteModule(entity, gameId);
      case "Widget":
        return this.api.deleteWidget(entity, gameId);
      case "WidgetNode":
        return this.api.deleteNode(entity, gameId);
      case "Token":
        return this.api.deleteToken(entity, gameId);
      case "ImageAsset":
        return this.api.deleteImage(entity, gameId);
      case "Style":
        return this.api.deleteStyle(entity, gameId);
      case "Sound":
        return this.api.deleteSound(entity, gameId);
      case "Expression":
        return this.api.deleteExpression(entity, gameId);
      case "Animation":
        return this.api.deleteAnimation(entity, gameId);
      case "Setup":
        return this.api.deleteSetup(entity, gameId);
      case "Text":
        return this.api.deleteText(entity, gameId);
      case "Shape":
        return this.api.deleteShape(entity, gameId);
      case "Sonata":
        return this.api.deleteSonata(entity, gameId);
      default:
        return of(null);
    }
  }
}
