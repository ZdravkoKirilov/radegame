import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GameEditService } from '../../../../core';
import { Activity } from '../../../../game-mechanics';
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
} from '../../actions';

import { GET_ACTIVITIES, SAVE_ACTIVITY, DELETE_ACTIVITY } from '../../reducers';
import { toIndexedList } from '../../../../shared';

@Injectable()
export class ActivityEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getActivities: Observable<any> = this.actions$.ofType(GET_ACTIVITIES).pipe(
        map((action: GetActivitiesAction) => {
            return action.payload;
        }),
        mergeMap((payload: number) => {
            return this.api.getActivities(payload).pipe(
                mergeMap((res: Activity[]) => {
                    const items = toIndexedList(res);
                    return [
                        new GetActivitiesSuccessAction(),
                        new SetActivitiesAction(items)
                    ];
                }),
                catchError(() => {
                    return [new GetActivitiesFailAction()];
                })
            );
        }),
    );

    @Effect() saveActivity: Observable<any> = this.actions$.ofType(SAVE_ACTIVITY).pipe(
        map((action: SaveActivityAction) => {
            const payload = { ...action.payload };
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        }),
        mergeMap((payload: Activity) => {
            return this.api.saveActivity(payload).pipe(
                mergeMap((res: Activity) => {
                    return [
                        new AddActivityAction(res),
                        new SaveActivitySuccessAction(res)
                    ];
                }),
                catchError(() => {
                    return [new SaveActivityFailAction()];
                })
            );
        }),
    );

    @Effect() deleteActivity: Observable<any> = this.actions$.ofType(DELETE_ACTIVITY).pipe(
        map((action: DeleteActivityAction) => action.payload),
        mergeMap((payload: Activity) => {
            return this.api.deleteActivity(payload).pipe(
                mergeMap(() => {
                    return [
                        new RemoveActivityAction(payload),
                        new DeleteActivitySuccessAction(payload),
                    ];
                }),
                catchError(() => {
                    return [new DeleteActivityFailAction()];
                })
            );
        })
    );
}
