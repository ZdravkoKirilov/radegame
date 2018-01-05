import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../../services/game-edit.service';
import { Faction } from '../../../../game-mechanics/models/index';
import {
    AddFactionAction,
    DeleteFactionFailAction,
    DeleteFactionSuccessAction,
    RemoveFactionAction,
    SaveFactionFailAction,
    SaveFactionSuccessAction,
    GetFactionsAction,
    GetFactionsSuccessAction,
    GetFactionsFailAction,
    SetFactionsAction,
    SaveFactionAction,
    DeleteFactionAction
} from '../../actions/byFeature/faction.action';

import { OperationFailAction, OperationSuccessAction } from '../../../../core/state/actions/actions';
import { systemMessages as sm } from '../../../../shared/config/messages';
import { DELETE_FACTION, SAVE_FACTION, GET_FACTIONS } from '../../reducers/byFeature/factions.reducer';
import { toIndexedList } from '../../../../shared/utils/utils';

@Injectable()
export class FactionEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getFactions: Observable<any> = this.actions$
        .ofType(GET_FACTIONS)
        .map((action: GetFactionsAction) => {
            return action.payload;
        })
        .mergeMap((payload: number) => {
            return this.api.getFactions(payload);
        })
        .mergeMap((res: Faction[]) => {
            const factions = toIndexedList(res);
            return [
                new GetFactionsSuccessAction(),
                new SetFactionsAction(factions)
            ];
        })
        .catch(() => {
            return [new GetFactionsFailAction()];
        });

    @Effect() saveFaction: Observable<any> = this.actions$
        .ofType(SAVE_FACTION)
        .map((action: SaveFactionAction) => {
            const payload = {...action.payload};
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        })
        .mergeMap((payload: Faction) => {
            return this.api.saveFaction(payload);
        })
        .mergeMap((res: Faction) => {
            return [
                new AddFactionAction(res),
                new SaveFactionSuccessAction(res),
                new OperationSuccessAction(sm.SAVE_FACTION_SUCCESS)
            ];
        })
        .catch(() => {
            return [new SaveFactionFailAction(), new OperationFailAction(sm.SAVE_FACTION_FAIL)];
        });

    @Effect() deleteFaction: Observable<any> = this.actions$
        .ofType(DELETE_FACTION)
        .map((action: DeleteFactionAction) => action.payload)
        .mergeMap((payload: Faction) => {
            return this.api.deleteFaction(payload)
                .mergeMap(() => {
                    return [
                        new RemoveFactionAction(payload),
                        new DeleteFactionSuccessAction(payload),
                        new OperationSuccessAction(sm.DELETE_FACTION_SUCCESS)
                    ];
                })
                .catch(() => {
                    return [new DeleteFactionFailAction(), new OperationFailAction(sm.DELETE_FACTION_FAIL)];
                });
        });


}
