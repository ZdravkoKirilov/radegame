import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../../services/game-edit.service';
import { Activity } from '../../../../game-mechanics/models/index';
import {
    GetActivitiesAction,
    SetActivitiesAction,
    GetActivitiesSuccessAction,
    GetActivitiesFailAction
} from '../../actions/byFeature/activity.action';

import { OperationFailAction, OperationSuccessAction } from '../../../../core/state/actions/actions';
import { systemMessages as sm } from '../../../../shared/config/messages';
import { GET_ACTIVITIES, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_FAIL, SET_ACTIVITIES } from '../../reducers/byFeature/activity.reducer';
import { toIndexedList } from '../../../../shared/utils/utils';

@Injectable()
export class ActivityEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getFactions: Observable<any> = this.actions$
        .ofType(GET_ACTIVITIES)
        .map((action: GetActivitiesAction) => {
            return action.payload;
        })
        .mergeMap((payload: number) => {
            return this.api.getActivities(payload);
        })
        .mergeMap((res: Activity[]) => {
            const factions = toIndexedList(res);
            return [
                new GetActivitiesSuccessAction(),
                new SetActivitiesAction(factions)
            ];
        })
        .catch(() => {
            return [new GetActivitiesFailAction()];
        });

    // @Effect() saveFaction: Observable<any> = this.actions$
    //     .ofType(SAVE_FACTION)
    //     .map((action: SaveFactionAction) => {
    //         const payload = { ...action.payload };
    //         if (typeof payload.image === 'string') {
    //             delete payload.image;
    //         }
    //         return payload;
    //     })
    //     .mergeMap((payload: Faction) => {
    //         return this.api.saveFaction(payload);
    //     })
    //     .mergeMap((res: Faction) => {
    //         return [
    //             new AddFactionAction(res),
    //             new SaveFactionSuccessAction(res),
    //             new OperationSuccessAction(sm.SAVE_FACTION_SUCCESS)
    //         ];
    //     })
    //     .catch(() => {
    //         return [new SaveFactionFailAction(), new OperationFailAction(sm.SAVE_FACTION_FAIL)];
    //     });

    // @Effect() deleteFaction: Observable<any> = this.actions$
    //     .ofType(DELETE_FACTION)
    //     .map((action: DeleteFactionAction) => action.payload)
    //     .mergeMap((payload: Faction) => {
    //         return this.api.deleteFaction(payload)
    //             .mergeMap(() => {
    //                 return [
    //                     new RemoveFactionAction(payload),
    //                     new DeleteFactionSuccessAction(payload),
    //                     new OperationSuccessAction(sm.DELETE_FACTION_SUCCESS)
    //                 ];
    //             })
    //             .catch(() => {
    //                 return [new DeleteFactionFailAction(), new OperationFailAction(sm.DELETE_FACTION_FAIL)];
    //             });
    //     });


}
