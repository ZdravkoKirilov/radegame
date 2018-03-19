import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { GameEditService } from '../../../../core';
import { Field } from '../../../../game-mechanics';
import { AppState } from '../../../../core';

import {
    DeleteFieldFailAction,
    DeleteFieldSuccessAction,
    FieldAction as FieldAction,
    SaveFieldFailAction,
    SaveFieldSuccessAction,
    GetFieldsAction,
    GetFieldsSuccessAction,
    GetFieldsFailAction,
    SetFieldsAction
} from '../../actions';

import { GetMapPathsAction, DeleteMapLocationSuccessAction, SaveMapLocationAction } from '../../actions';

import { OperationFailAction, OperationSuccessAction } from '../../../../core';
import { systemMessages as sm } from '../../../../shared';
import { DELETE_FIELD, SAVE_FIELD, GET_FIELDS, UPDATE_FIELD } from '../../reducers';
import { toIndexedList } from '../../../../shared';
import { composeDefaultLoc } from '../../../utils';

@Injectable()
export class FieldEffectsService {

    constructor(private actions$: Actions, private api: GameEditService, private store: Store<AppState>) {
    }

    @Effect() getFields: Observable<any> = this.actions$.ofType(GET_FIELDS).pipe(
        map((action: GetFieldsAction) => {
            return action.payload;
        }),
        mergeMap((payload: number) => {
            return this.api.getFields(payload).pipe(
                mergeMap((res: Field[]) => {
                    const items = toIndexedList(res);
                    return [new SetFieldsAction(items), new GetFieldsSuccessAction()];
                }),
                catchError(() => {
                    return of([new GetFieldsFailAction()]);
                })
            );
        }),
    );

    @Effect() saveField: Observable<any> = this.actions$.ofType(SAVE_FIELD).pipe(
        map((action: FieldAction) => {
            const payload = { ...action.payload };
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        }),
        mergeMap((payload: Field) => {
            return this.api.saveBoardField(payload).pipe(
                mergeMap((res: Field) => {
                    const location = composeDefaultLoc(res);
                    return [
                        new SaveFieldSuccessAction(res),
                        new OperationSuccessAction(sm.SAVE_FIELD_SUCCESS),
                        new SaveMapLocationAction(location)
                    ];
                }),
                catchError(() => {
                    return of([new SaveFieldFailAction(), new OperationFailAction(sm.SAVE_FIELD_FAIL)]);
                })
            );
        }),
    );

    @Effect() updateField: Observable<any> = this.actions$.ofType(UPDATE_FIELD).pipe(
        map((action: FieldAction) => {
            const payload = { ...action.payload };
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        }),
        mergeMap((payload: Field) => {
            return this.api.saveBoardField(payload).pipe(
                mergeMap((res: Field) => {
                    return of([new SaveFieldSuccessAction(res), new OperationSuccessAction(sm.SAVE_FIELD_SUCCESS)]);
                }),
                catchError(() => {
                    return of([new SaveFieldFailAction(), new OperationFailAction(sm.SAVE_FIELD_FAIL)]);
                })
            );
        }),
    );

    @Effect() deleteField: Observable<any> = this.actions$.ofType(DELETE_FIELD).pipe(
        map((action: FieldAction) => action.payload),
        map((payload: Field) => {
            if (payload.id) {
                this.store.dispatch(new DeleteFieldSuccessAction(payload));
            }
            return payload;
        }),
        mergeMap((payload: Field) => {
            return this.api.deleteBoardField(payload).pipe(
                mergeMap(() => {
                    return [
                        new DeleteFieldSuccessAction(payload),
                        new DeleteMapLocationSuccessAction({ field: payload.id }),
                        new GetMapPathsAction(payload.game),
                        new OperationSuccessAction(sm.DELETE_FIELD_SUCCESS)
                    ];
                }),
                catchError(() => {
                    const actions: any[] = [new DeleteFieldFailAction(), new OperationFailAction(sm.DELETE_FIELD_FAIL)];
                    if (payload.id) {
                        actions.push(new SaveFieldSuccessAction(payload));
                    }
                    return of(actions);
                })
            );
        })
    );
}
