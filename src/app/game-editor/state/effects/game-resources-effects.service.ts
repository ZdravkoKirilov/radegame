import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {GameResourcesService} from '../../../shared/services/game-resources.service';
import * as actionTypes from '../actions/actionTypes';
import {Actions as IActions, SaveResourceSuccessAction, SaveResourceFailAction} from '../actions/byFeature/resourceActions';
import {Resource} from '../../../game-mechanics/models/Resource';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class GameResourcesEffectsService {

    constructor(private actions$: Actions, private api: GameResourcesService) {
    }

    @Effect() saveResource: Observable<any> = this.actions$.ofType(actionTypes.SAVE_RESOURCE)
        .mergeMap((action: IActions) => {
            return this.api.saveGameResource(action.payload);
        })
        .map((res: Resource) => {
            return new SaveResourceSuccessAction(res);
        })
        .catch(() => {
            return of(new SaveResourceFailAction());
        });
}
