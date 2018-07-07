import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GameEditService } from '@app/core';
import { GameEntity, Activity, Field, Quest, Round, Faction } from '@app/game-mechanics';
import { actionTypes } from '../actions/actionTypes';
import {
    formKeys, FormKey, GenericActionPayload,
    SaveItemAction, SaveItemSuccessAction, SaveItemFailAction, SetItemAction, DeleteItemAction,
    DeleteItemSuccessAction, DeleteItemFailAction, RemoveItemAction
} from '../actions/generics';

@Injectable()
export class GenericEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() saveItem: Observable<any> = this.actions$.ofType(actionTypes.SAVE_ITEM).pipe(
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

    @Effect() deleteItem: Observable<any> = this.actions$.ofType(actionTypes.DELETE_ITEM).pipe(
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

    saveRequest(key: FormKey, entity: GameEntity): Observable<GameEntity> {
        switch (key) {
            case formKeys.RESOURCES:
                return this.api.saveResource(entity);
            case formKeys.ACTIVITIES:
                return this.api.saveActivity(<Activity>entity);
            case formKeys.FACTIONS:
                return this.api.saveFaction(<Faction>entity);
            case formKeys.FIELDS:
                return this.api.saveBoardField(<Field>entity);
            case formKeys.QUESTS:
                return this.api.saveQuest(<Quest>entity);
            case formKeys.ROUNDS:
                return this.api.saveRound(<Round>entity);
            case formKeys.STAGES:
                return this.api.saveStage(entity);
            case formKeys.TRIVIA:
                return this.api.saveTrivia(entity);
            case formKeys.LOCATIONS:
                return this.api.saveMapLocation(entity);
            case formKeys.PATHS:
                return this.api.saveMapPath(entity);
            case formKeys.GAMES:
                return this.api.saveGame(entity)
            default:
                return of(null);
        }
    };

    deleteRequest(key: FormKey, entity: any): Observable<GameEntity> {
        switch (key) {
            case formKeys.RESOURCES:
                return this.api.deleteResource(entity);
            case formKeys.ACTIVITIES:
                return this.api.deleteActivity(entity);
            case formKeys.FACTIONS:
                return this.api.deleteFaction(entity);
            case formKeys.FIELDS:
                return this.api.deleteBoardField(entity);
            case formKeys.QUESTS:
                return this.api.deleteQuest(entity);
            case formKeys.ROUNDS:
                return this.api.deleteRound(entity);
            case formKeys.STAGES:
                return this.api.deleteStage(entity);
            case formKeys.TRIVIA:
                return this.api.deleteTrivia(entity);
            case formKeys.PATHS:
                return this.api.deleteMapPath(entity);
            default:
                return of(null);
        }
    }
}
