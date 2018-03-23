import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MatSnackBar } from '@angular/material';

import { actionTypes, CoreAction } from '../actions';

@Injectable()
export class CoreEffectsService {

    constructor(private actions: Actions, private snackbar: MatSnackBar) {
    }

    @Effect({ dispatch: false }) showSnackbar: Observable<any> = this.actions
        .ofType(actionTypes.OPERATION_SUCCESS, actionTypes.OPERATION_FAIL)
        .map((action: CoreAction) => {
            const message = action.payload.toString();
            this.snackbar.open(message, 'Close', { duration: 3000 });
            return of({ type: 'FAKE_ACTION' });
        });
}
