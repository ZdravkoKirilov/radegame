import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {GameTriviaService} from '../../../shared/services/game-trivia.service';
import * as actionTypes from '../actions/actionTypes';
import {Actions as IActions, SaveTriviaSuccessAction, SaveTriviaFailAction} from '../actions/actions';
import {Trivia} from '../../../game-mechanics/models/index';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class GameTriviaEffectsService {

    constructor(private actions$: Actions, private api: GameTriviaService) {
    }

    @Effect() saveResource: Observable<any> = this.actions$.ofType(actionTypes.SAVE_RESOURCE)
        .mergeMap((action: IActions) => {
            return this.api.saveGameTrivia(action.payload);
        })
        .map((res: Trivia) => {
            return new SaveTriviaSuccessAction(res);
        })
        .catch(() => {
            return of(new SaveTriviaFailAction());
        });
}

