import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {GameCharactersService} from '../../../shared/services/game-characters.service';
import {Character} from '../../../game-mechanics/models/Character';
import * as actionTypes from '../actions/actionTypes';
import {Actions as IActions, SaveCharacterSuccessAction, SaveCharacterFailAction} from '../actions/byFeature/characterActions';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class GameCharactersEffectsService {

    constructor(private actions$: Actions, private api: GameCharactersService) {
    }

    @Effect() saveCharacter: Observable<any> = this.actions$
        .ofType(actionTypes.SAVE_CHARACTER)
        .mergeMap((action: IActions) => {
            return this.api.saveGameCharacter(action.payload);
        })
        .mergeMap((res: Character) => {
            return [new SaveCharacterSuccessAction(res)];
        })
        .catch(() => {
            return of(new SaveCharacterFailAction());
        });
}

