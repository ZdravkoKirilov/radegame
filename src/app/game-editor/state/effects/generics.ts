import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { GameEditService, GameFetchService } from '@app/core';
import {
    GameEntity, GameAction, Condition, Round,
    Faction, Token, Choice, Game, ImageAsset, Stage, Slot, Style, Setup,
    AllEntity, ALL_ENTITIES, Transition, Animation, Sonata, Text, Shape
} from '@app/game-mechanics';
import { actionTypes, SetItemsAction, FetchItemsSuccessAction, FetchGameDataAction, FetchGameDataFail, FillFormAction, FetchGameDataSuccess } from '../actions';
import {
    GenericActionPayload,
    SaveItemAction, SaveItemSuccessAction, SaveItemFailAction, SetItemAction, DeleteItemAction,
    DeleteItemSuccessAction, DeleteItemFailAction, RemoveItemAction, FetchItemsAction
} from '../actions';
import { toDictionary, formatGameConfigData } from '@app/shared';

@Injectable()
export class GenericEffectsService {

    constructor(private actions$: Actions, private api: GameEditService, private fetcher: GameFetchService) {
    }

    @Effect() fetchGameData: Observable<any> = this.actions$
        .pipe(
            ofType(actionTypes.FETCH_GAME_DATA),
            mergeMap((action: FetchGameDataAction) => {
                return this.fetcher.getGameData(action.payload)
                    .pipe(
                        mergeMap(res => {
                            const payload = formatGameConfigData(res);

                            return [
                                new FetchGameDataSuccess(),
                                new FillFormAction(payload),
                            ];
                        }),
                        catchError(err => {
                            return [new FetchGameDataFail()];
                        })
                    )
            })
        )

    @Effect() fetchItems: Observable<any> = this.actions$.pipe(
        ofType(actionTypes.FETCH_ITEMS),
        map((action: FetchItemsAction) => {
            const payload = <GenericActionPayload>{ ...action.payload };
            return payload;
        }),
        mergeMap(payload => {
            const { data, key } = payload;

            return this.fetchRequest(key, data as any).pipe(
                mergeMap((res: GameEntity[]) => {
                    const response: GenericActionPayload = {
                        key, data: toDictionary(res, 'id'),
                    };
                    return [
                        new SetItemsAction(response),
                        new FetchItemsSuccessAction(response),
                    ];
                }),
                catchError(() => {
                    return [new SaveItemFailAction()];
                })
            );

        })
    )

    @Effect() saveItem: Observable<any> = this.actions$.pipe(
        ofType(actionTypes.SAVE_ITEM),
        map((action: SaveItemAction) => {
            const payload = <GenericActionPayload>{ ...action.payload };
            return payload;
        }),
        switchMap((payload: GenericActionPayload) => {
            const data = <GameEntity>payload.data;
            const key = <AllEntity>payload.key;
            return this.saveRequest(key, data).pipe(
                mergeMap((res: GameEntity) => {
                    const response: GenericActionPayload = {
                        key, data: res
                    };
                    return [
                        new SetItemAction(response),
                        new SaveItemSuccessAction(response),
                    ];
                }),
                catchError(() => {
                    return [new SaveItemFailAction()];
                })
            );
        }),
    );

    @Effect() deleteItem: Observable<any> = this.actions$.pipe(
        ofType(actionTypes.DELETE_ITEM),
        map((action: DeleteItemAction) => action.payload),
        mergeMap((payload: GenericActionPayload) => {
            const data = <GameEntity>payload.data;
            const key = <AllEntity>payload.key;
            return this.deleteRequest(key, data).pipe(
                mergeMap(() => {
                    return [
                        new DeleteItemSuccessAction(payload),
                        new RemoveItemAction(payload)
                    ];
                }),
                catchError(() => {
                    return of(new DeleteItemFailAction());
                })
            );
        })
    );

    fetchRequest(key: AllEntity, data: number): Observable<any[]> {
        switch (key) {

            case ALL_ENTITIES.actions:
                return this.fetcher.getActions(data);
            case ALL_ENTITIES.factions:
                return this.fetcher.getFactions(data);
            case ALL_ENTITIES.conditions:
                return this.fetcher.getConditions(data);
            case ALL_ENTITIES.rounds:
                return this.fetcher.getRounds(data);
            case ALL_ENTITIES.stages:
                return this.fetcher.getStages(data);
            case ALL_ENTITIES.choices:
                return this.fetcher.getChoices(data);
            case ALL_ENTITIES.tokens:
                return this.fetcher.getTokens(data);
            case ALL_ENTITIES.images:
                return this.fetcher.getImages(data);
            case ALL_ENTITIES.games:
                return this.fetcher.getGames();
            default:
                return of(null);
        }
    };

    saveRequest(key: AllEntity, entity: GameEntity): Observable<GameEntity> {
        switch (key) {
            case ALL_ENTITIES.actions:
                return this.api.saveAction(<GameAction>entity);
            case ALL_ENTITIES.factions:
                return this.api.saveFaction(<Faction>entity);
            case ALL_ENTITIES.conditions:
                return this.api.saveCondition(<Condition>entity);
            case ALL_ENTITIES.rounds:
                return this.api.saveRound(<Round>entity);
            case ALL_ENTITIES.stages:
                return this.api.saveStage(<Stage>entity);
            case ALL_ENTITIES.choices:
                return this.api.saveChoice(<Choice>entity);
            case ALL_ENTITIES.tokens:
                return this.api.saveToken(<Token>entity);
            case ALL_ENTITIES.images:
                return this.api.saveImage(<ImageAsset>entity);
            case ALL_ENTITIES.styles:
                return this.api.saveStyle(<Style>entity);
            case ALL_ENTITIES.sounds:
                return this.api.saveSound(entity);
            case ALL_ENTITIES.expressions:
                return this.api.saveExpression(entity);
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
            case ALL_ENTITIES.games:
                if ((entity as Game).image && (entity as Game).image.includes('http')) {
                    delete (entity as Game).image
                }
                return this.api.saveGame(<Game>entity);
            default:
                return of(null);
        }
    };

    deleteRequest(key: AllEntity, entity: GameEntity): Observable<GameEntity> {
        switch (key) {
            case ALL_ENTITIES.actions:
                return this.api.deleteAction(<GameAction>entity);
            case ALL_ENTITIES.factions:
                return this.api.deleteFaction(<Faction>entity);
            case ALL_ENTITIES.conditions:
                return this.api.deleteCondition(<Condition>entity);
            case ALL_ENTITIES.rounds:
                return this.api.deleteRound(<Round>entity);
            case ALL_ENTITIES.stages:
                return this.api.deleteStage(<Stage>entity);
            case ALL_ENTITIES.choices:
                return this.api.deleteChoice(<Choice>entity);
            case ALL_ENTITIES.tokens:
                return this.api.deleteToken(<Token>entity);
            case ALL_ENTITIES.images:
                return this.api.deleteImage(<ImageAsset>entity);
            case ALL_ENTITIES.styles:
                return this.api.deleteStyle(<Style>entity);
            case ALL_ENTITIES.sounds:
                return this.api.deleteSound(entity);
            case ALL_ENTITIES.expressions:
                return this.api.deleteExpression(entity);
            case ALL_ENTITIES.animations:
                return this.api.deleteAnimation(<Animation>entity);
            case ALL_ENTITIES.setups:
                return this.api.deleteSetup(<Setup>entity);
            case ALL_ENTITIES.transitions:
                return this.api.deleteTransition(<Setup>entity);
            case ALL_ENTITIES.texts:
                return this.api.deleteText(entity);
            case ALL_ENTITIES.shapes:
                return this.api.deleteShape(<Shape>entity);
            case ALL_ENTITIES.sonatas:
                return this.api.deleteSonata(entity);
            default:
                return of(null);
        }
    }
}
