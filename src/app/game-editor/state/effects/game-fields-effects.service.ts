import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {BoardFieldsService} from '../../../shared/services/board-fields.service';
import {GridFieldPayload} from '../models/index';
import {BoardField} from '../../../game-mechanics/models/BoardField';
import * as actionTypes from '../actions/actionTypes';
import {
    Actions as IActions,
    SaveFieldSuccessAction,
    SaveFieldFailAction,
    AddGridFieldAction
} from '../actions/byFeature/fieldActions';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class GameFieldsEffectsService {

    constructor(private actions$: Actions, private api: BoardFieldsService) {
    }

    @Effect() saveField: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_FIELD)
        .map((action: IActions) => action.payload)
        .mergeMap((payload: GridFieldPayload) => {
            return Observable.forkJoin([this.api.saveBoardField(payload.data), of(payload.coords)]);
        })
        .mergeMap((res: any[]) => {
            const field: BoardField = res[0];
            const fieldWithCoords: GridFieldPayload = {
                data: field,
                coords: res[1]
            };
            return [new SaveFieldSuccessAction(field), new AddGridFieldAction(fieldWithCoords)];
        })
        .catch(() => {
            return of(new SaveFieldFailAction());
        });
}
