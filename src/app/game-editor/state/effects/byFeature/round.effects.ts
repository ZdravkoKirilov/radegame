import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../../../core';
import { Round } from '../../../../game-mechanics';
import {
    GetRoundsAction,
    SetRoundsAction,
    GetRoundsSuccessAction,
    GetRoundsFailAction,
    SaveRoundAction,
    SaveRoundSuccessAction,
    SaveRoundFailAction,
    AddRoundAction,
    DeleteRoundAction,
    DeleteRoundSuccessAction,
    DeleteRoundFailAction,
    RemoveRoundAction
} from '../../actions';

import { GET_ROUNDS, SAVE_ROUND, DELETE_ROUND } from '../../reducers';
import { toIndexedList } from '../../../../shared';

@Injectable()
export class RoundEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getRounds: Observable<any> = this.actions$
        .ofType(GET_ROUNDS)
        .map((action: GetRoundsAction) => {
            return action.payload;
        })
        .mergeMap((payload: number) => {
            return this.api.getRounds(payload);
        })
        .mergeMap((res: Round[]) => {
            const items = toIndexedList(res);
            return [
                new GetRoundsSuccessAction(),
                new SetRoundsAction(items),
            ];
        })
        .catch(() => {
            return [new GetRoundsFailAction()];
        });

    @Effect() saveRound: Observable<any> = this.actions$
        .ofType(SAVE_ROUND)
        .map((action: SaveRoundAction) => {
            const payload = {...action.payload};
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return <Round>payload;
        })
        .mergeMap((payload: Round) => {
            return this.api.saveRound(payload);
        })
        .mergeMap((res: Round) => {
            return [
                new AddRoundAction(res),
                new SaveRoundSuccessAction(res)
            ];
        })
        .catch(() => {
            return [new SaveRoundFailAction()];
        });

    @Effect() deleteRound: Observable<any> = this.actions$
        .ofType(DELETE_ROUND)
        .map((action: DeleteRoundAction) => action.payload)
        .mergeMap((payload: Round) => {
            return this.api.deleteRound(payload)
                .mergeMap(() => {
                    return [
                        new RemoveRoundAction(payload),
                        new DeleteRoundSuccessAction(payload),
                    ];
                })
                .catch(() => {
                    return [new DeleteRoundFailAction()];
                });
        });
}
