import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../../services/game-edit.service';
import { Field } from '../../../../game-mechanics/models/index';
import { AppState } from '../../../../core/state/index';

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
} from '../../actions/byFeature/field.action';

import { GetMapPathsAction, DeleteMapLocationSuccessAction } from '../../actions/byFeature/map.action';

import { OperationFailAction, OperationSuccessAction } from '../../../../core/state/actions/actions';
import { systemMessages as sm } from '../../../../shared/config/messages';
import { DELETE_FIELD, SAVE_FIELD, GET_FIELDS } from '../../reducers/byFeature/fields.reducer';
import { toIndexedList } from '../../../../shared/utils/utils';

@Injectable()
export class FieldEffectsService {

    constructor(private actions$: Actions, private api: GameEditService, private store: Store<AppState>) {
    }

    @Effect() getFields: Observable<any> = this.actions$
        .ofType(GET_FIELDS)
        .map((action: GetFieldsAction) => {
            return action.payload;
        })
        .mergeMap((payload: number) => {
            return this.api.getFields(payload);
        })
        .mergeMap((res: Field[]) => {
            const items = toIndexedList(res);
            return [new SetFieldsAction(items), new GetFieldsSuccessAction()];
        })
        .catch(() => {
            return [new GetFieldsFailAction()];
        });

    @Effect() saveField: Observable<any> = this.actions$
        .ofType(SAVE_FIELD)
        .map((action: FieldAction) => {
            const payload = {...action.payload};
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        })
        .mergeMap((payload: Field) => {
            return this.api.saveBoardField(payload);
        })
        .mergeMap((res: Field) => {
            return [new SaveFieldSuccessAction(res), new OperationSuccessAction(sm.SAVE_FIELD_SUCCESS)];
        })
        .catch(() => {
            return [new SaveFieldFailAction(), new OperationFailAction(sm.SAVE_FIELD_FAIL)];
        });

    @Effect() deleteField: Observable<any> = this.actions$
        .ofType(DELETE_FIELD)
        .map((action: FieldAction) => action.payload)
        .map((payload: Field) => {
            if (payload.id) {
                this.store.dispatch(new DeleteFieldSuccessAction(payload));
            }
            return payload;
        })
        .mergeMap((payload: Field) => {
            return this.api.deleteBoardField(payload)
                .mergeMap(() => {
                    return [
                        new DeleteFieldSuccessAction(payload),
                        new DeleteMapLocationSuccessAction({field: payload.id}),
                        new GetMapPathsAction(payload.game),
                        new OperationSuccessAction(sm.DELETE_FIELD_SUCCESS)
                    ];
                })
                .catch(() => {
                    const actions: any[] = [new DeleteFieldFailAction(), new OperationFailAction(sm.DELETE_FIELD_FAIL)];
                    if (payload.id) {
                        actions.push(new SaveFieldSuccessAction(payload));
                    }
                    return actions;
                });
        });
}
