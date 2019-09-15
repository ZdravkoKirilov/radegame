import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GameEditService, GameFetchService } from '@app/core';
import {
    GameEntity, GameAction, Field, Condition, Round, Team, Handler,
    Faction, Token, Phase, Choice, PathEntity, Game, ImageAsset, Stage, Slot, EntityState, Style, Keyword, Setup,
} from '@app/game-mechanics';
import { actionTypes, SetItemsAction, FetchItemsSuccessAction, FetchGameDataAction, FetchGameDataFail, FillFormAction, FetchGameDataSuccess } from '../actions';
import {
    GenericActionPayload,
    SaveItemAction, SaveItemSuccessAction, SaveItemFailAction, SetItemAction, DeleteItemAction,
    DeleteItemSuccessAction, DeleteItemFailAction, RemoveItemAction, FetchItemsAction
} from '../actions';
import { FormKey, formKeys } from '../form-keys';
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
        mergeMap((payload: GenericActionPayload) => {
            const data = <GameEntity>payload.data;
            const key = <FormKey>payload.key;
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
            const key = <FormKey>payload.key;
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

    fetchRequest(key: FormKey, data: number): Observable<any[]> {
        switch (key) {

            case formKeys.actions:
                return this.fetcher.getActions(data);
            case formKeys.factions:
                return this.fetcher.getFactions(data);
            case formKeys.fields:
                return this.fetcher.getFields(data);
            case formKeys.conditions:
                return this.fetcher.getConditions(data);
            case formKeys.rounds:
                return this.fetcher.getRounds(data);
            case formKeys.stages:
                return this.fetcher.getStages(data);
            case formKeys.choices:
                return this.fetcher.getChoices(data);
            case formKeys.slots:
                return this.fetcher.getSlots(data);
            case formKeys.paths:
                return this.fetcher.getPaths(data);
            case formKeys.tokens:
                return this.fetcher.getTokens(data);
            case formKeys.phases:
                return this.fetcher.getPhases(data);
            case formKeys.teams:
                return this.fetcher.getTeams(data);
            case formKeys.images:
                return this.fetcher.getImages(data);
            case formKeys.games:
                return this.fetcher.getGames();
            default:
                return of(null);
        }
    };

    saveRequest(key: FormKey, entity: GameEntity): Observable<GameEntity> {
        switch (key) {
            case formKeys.actions:
                return this.api.saveAction(<GameAction>entity);
            case formKeys.factions:
                return this.api.saveFaction(<Faction>entity);
            case formKeys.fields:
                return this.api.saveField(<Field>entity);
            case formKeys.conditions:
                return this.api.saveCondition(<Condition>entity);
            case formKeys.rounds:
                return this.api.saveRound(<Round>entity);
            case formKeys.stages:
                return this.api.saveStage(<Stage>entity);
            case formKeys.choices:
                return this.api.saveChoice(<Choice>entity);
            case formKeys.slots:
                return this.api.saveSlot(<Slot>entity);
            case formKeys.paths:
                return this.api.saveMapPath(<PathEntity>entity);
            case formKeys.tokens:
                return this.api.saveToken(<Token>entity);
            case formKeys.phases:
                return this.api.savePhase(<Phase>entity);
            case formKeys.teams:
                return this.api.saveTeam(<Team>entity);
            case formKeys.images:
                return this.api.saveImage(<ImageAsset>entity);
            case formKeys.keywords:
                return this.api.saveKeyword(<Keyword>entity);
            case formKeys.styles:
                return this.api.saveStyle(<Style>entity);
            case formKeys.sounds:
                return this.api.saveSound(entity);
            case formKeys.states:
                return this.api.saveEntityState(<EntityState>entity);
            case formKeys.expressions:
                return this.api.saveExpression(entity);
            case formKeys.animations:
                return this.api.saveAnimation(entity);
            case formKeys.handlers:
                return this.api.saveHandler(<Handler>entity);
            case formKeys.setups:
                return this.api.saveSetup(<Setup>entity);
            case formKeys.games:
                if ((entity as Game).image && (entity as Game).image.includes('http')) {
                    delete (entity as Game).image
                }
                return this.api.saveGame(<Game>entity);
            default:
                return of(null);
        }
    };

    deleteRequest(key: FormKey, entity: GameEntity): Observable<GameEntity> {
        switch (key) {
            case formKeys.actions:
                return this.api.deleteAction(<GameAction>entity);
            case formKeys.factions:
                return this.api.deleteFaction(<Faction>entity);
            case formKeys.fields:
                return this.api.deleteField(<Field>entity);
            case formKeys.conditions:
                return this.api.deleteCondition(<Condition>entity);
            case formKeys.rounds:
                return this.api.deleteRound(<Round>entity);
            case formKeys.stages:
                return this.api.deleteStage(<Stage>entity);
            case formKeys.choices:
                return this.api.deleteChoice(<Choice>entity);
            case formKeys.paths:
                return this.api.deleteMapPath(<PathEntity>entity);
            case formKeys.tokens:
                return this.api.deleteToken(<Token>entity);
            case formKeys.phases:
                return this.api.deletePhase(<Phase>entity);
            case formKeys.teams:
                return this.api.deleteTeam(<Team>entity);
            case formKeys.slots:
                return this.api.deleteSlot(<Slot>entity);
            case formKeys.images:
                return this.api.deleteImage(<ImageAsset>entity);
            case formKeys.keywords:
                return this.api.deleteKeyword(<Keyword>entity);
            case formKeys.styles:
                return this.api.deleteStyle(<Style>entity);
            case formKeys.sounds:
                return this.api.deleteSound(entity);
            case formKeys.states:
                return this.api.deleteEntityState(<EntityState>entity);
            case formKeys.expressions:
                return this.api.deleteExpression(entity);
            case formKeys.animations:
                return this.api.deleteAnimation(entity);
            case formKeys.handlers:
                return this.api.deleteHandler(<Handler>entity);
            case formKeys.setups:
                return this.api.deleteSetup(<Setup>entity)
            default:
                return of(null);
        }
    }
}
