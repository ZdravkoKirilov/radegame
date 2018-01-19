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
    GetActivitiesFailAction,
    SaveActivityAction,
    SaveActivitySuccessAction,
    SaveActivityFailAction,
    AddActivityAction,
    DeleteActivityAction,
    DeleteActivitySuccessAction,
    DeleteActivityFailAction,
    RemoveActivityAction
} from '../../actions/byFeature/activity.action';

import { GET_ACTIVITIES, SAVE_ACTIVITY, DELETE_ACTIVITY } from '../../reducers/byFeature/activity.reducer';
import { toIndexedList } from '../../../../shared/utils/utils';

@Injectable()
export class ActivityEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getActivities: Observable<any> = this.actions$
        .ofType(GET_ACTIVITIES)
        .map((action: GetActivitiesAction) => {
            return action.payload;
        })
        .mergeMap((payload: number) => {
            return this.api.getActivities(payload);
        })
        .mergeMap((res: Activity[]) => {
            const items = toIndexedList(res);
            return [
                new GetActivitiesSuccessAction(),
                new SetActivitiesAction(items)
            ];
        })
        .catch(() => {
            return [new GetActivitiesFailAction()];
        });

    @Effect() saveActivity: Observable<any> = this.actions$
        .ofType(SAVE_ACTIVITY)
        .map((action: SaveActivityAction) => {
            const payload = {...action.payload};
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        })
        .mergeMap((payload: Activity) => {
            return this.api.saveActivity(payload);
        })
        .mergeMap((res: Activity) => {
            return [
                new AddActivityAction(res),
                new SaveActivitySuccessAction(res)
            ];
        })
        .catch(() => {
            return [new SaveActivityFailAction()];
        });

    @Effect() deleteActivity: Observable<any> = this.actions$
        .ofType(DELETE_ACTIVITY)
        .map((action: DeleteActivityAction) => action.payload)
        .mergeMap((payload: Activity) => {
            return this.api.deleteActivity(payload)
                .mergeMap(() => {
                    return [
                        new RemoveActivityAction(payload),
                        new DeleteActivitySuccessAction(payload),
                    ];
                })
                .catch(() => {
                    return [new DeleteActivityFailAction()];
                });
        });
}
