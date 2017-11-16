import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {actionTypes} from '../actions/actionTypes';
import {CoreActions} from '../actions/actions';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class CoreEffectsService {

    constructor(private actions: Actions, private snackbar: MatSnackBar) {
    }

    @Effect({dispatch: false}) showSnackbar: Observable<any> = this.actions
        .ofType(actionTypes.OPERATION_SUCCESS, actionTypes.OPERATION_FAIL)
        .map((action: CoreActions) => {
            const message = action.payload;
            this.snackbar.open(message, 'Close', {duration: 3000});
            return of({type: 'FAKE_ACTION'});
        });
}
