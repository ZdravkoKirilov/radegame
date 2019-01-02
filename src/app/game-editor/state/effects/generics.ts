import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GameEditService } from '@app/core';
import {
    GameEntity, GameAction, Field, Condition, Round, Team,
    Faction, Token, Phase, Choice, PathEntity, Source, Game, ImageAsset,
} from '@app/game-mechanics';
import { actionTypes, SetItemsAction, FetchItemsSuccessAction } from '../actions';
import {
    GenericActionPayload,
    SaveItemAction, SaveItemSuccessAction, SaveItemFailAction, SetItemAction, DeleteItemAction,
    DeleteItemSuccessAction, DeleteItemFailAction, RemoveItemAction, FetchItemsAction
} from '../actions';
import { FormKey, formKeys } from '../form-keys';
import { toIndexedList } from '@app/shared';

@Injectable()
export class GenericEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() fetchItems: Observable<any> = this.actions$.ofType(actionTypes.FETCH_ITEMS).pipe(
        map((action: FetchItemsAction) => {
            const payload = <GenericActionPayload>{ ...action.payload };
            return payload;
        }),
        mergeMap(payload => {
            const { data, key } = payload;

            return this.fetchRequest(key, data as any).pipe(
                mergeMap((res: GameEntity[]) => {
                    const response: GenericActionPayload = {
                        key, data: toIndexedList(res, 'id'),
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

    fetchRequest(key: FormKey, data: number): Observable<GameEntity[]> {
        switch (key) {

            case formKeys.ACTIONS:
                return this.api.getActions(data);
            case formKeys.FACTIONS:
                return this.api.getFactions(data);
            case formKeys.FIELDS:
                return this.api.getFields(data);
            case formKeys.CONDITIONS:
                return this.api.getConditions(data);
            case formKeys.ROUNDS:
                return this.api.getRounds(data);
            case formKeys.STAGES:
                return this.api.getStages(data);
            case formKeys.CHOICES:
                return this.api.getChoices(data);
            case formKeys.SLOTS:
                return this.api.getSlots(data);
            case formKeys.PATHS:
                return this.api.getPaths(data);
            case formKeys.TOKENS:
                return this.api.getTokens(data);
            case formKeys.PHASES:
                return this.api.getPhases(data);
            case formKeys.TEAMS:
                return this.api.getTeams(data);
            case formKeys.SOURCES:
                return this.api.getSources(data);
            case formKeys.IMAGES:
                return this.api.getImages(data);
            case formKeys.GAMES:
                return this.api.getGames();
            default:
                return of(null);
        }
    };

    saveRequest(key: FormKey, entity: GameEntity): Observable<GameEntity> {
        switch (key) {
            case formKeys.ACTIONS:
                return this.api.saveAction(<GameAction>entity);
            case formKeys.FACTIONS:
                return this.api.saveFaction(<Faction>entity);
            case formKeys.FIELDS:
                return this.api.saveField(<Field>entity);
            case formKeys.CONDITIONS:
                return this.api.saveCondition(<Condition>entity);
            case formKeys.ROUNDS:
                return this.api.saveRound(<Round>entity);
            case formKeys.STAGES:
                return this.api.saveStage(entity);
            case formKeys.CHOICES:
                return this.api.saveChoice(<Choice>entity);
            case formKeys.SLOTS:
                return this.api.saveSlot(entity);
            case formKeys.PATHS:
                return this.api.saveMapPath(<PathEntity>entity);
            case formKeys.TOKENS:
                return this.api.saveToken(<Token>entity);
            case formKeys.PHASES:
                return this.api.savePhase(<Phase>entity);
            case formKeys.TEAMS:
                return this.api.saveTeam(<Team>entity);
            case formKeys.SOURCES:
                return this.api.saveSource(<Source>entity);
            case formKeys.IMAGES:
                return this.api.saveImage(entity);
            case formKeys.GAMES:
                return this.api.saveGame(<Game>entity);
            default:
                return of(null);
        }
    };

    deleteRequest(key: FormKey, entity: GameEntity): Observable<GameEntity> {
        switch (key) {
            case formKeys.ACTIONS:
                return this.api.deleteAction(<GameAction>entity);
            case formKeys.FACTIONS:
                return this.api.deleteFaction(entity);
            case formKeys.FIELDS:
                return this.api.deleteField(entity);
            case formKeys.CONDITIONS:
                return this.api.deleteCondition(<Condition>entity);
            case formKeys.ROUNDS:
                return this.api.deleteRound(entity);
            case formKeys.STAGES:
                return this.api.deleteStage(entity);
            case formKeys.CHOICES:
                return this.api.deleteChoice(<Choice>entity);
            case formKeys.PATHS:
                return this.api.deleteMapPath(entity);
            case formKeys.TOKENS:
                return this.api.deleteToken(entity);
            case formKeys.PHASES:
                return this.api.deletePhase(entity);
            case formKeys.TEAMS:
                return this.api.deleteTeam(entity);
            case formKeys.SLOTS:
                return this.api.deleteSlot(entity);
            case formKeys.SOURCES:
                return this.api.deleteSource(<Source>entity);
            case formKeys.IMAGES:
                return this.api.deleteImage(entity);
            default:
                return of(null);
        }
    }
}
