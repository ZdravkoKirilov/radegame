import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GameEditService } from '../../../../core';
import { Trivia } from '../../../../game-mechanics';
import {
    GetTriviasAction,
    SetTriviasAction,
    GetTriviasSuccessAction,
    GetTriviasFailAction,
    SaveTriviaAction,
    SaveTriviaFailAction,
    SaveTriviaSuccessAction,
    AddTriviaAction,
    DeleteTriviaAction,
    DeleteTriviaSuccessAction,
    DeleteTriviaFailAction,
    RemoveTriviaAction
} from '../../actions';

import { GET_TRIVIAS, SAVE_TRIVIA, DELETE_TRIVIA } from '../../reducers';
import { toIndexedList } from '../../../../shared';

@Injectable()
export class TriviaEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getTrivia: Observable<any> = this.actions$.ofType(GET_TRIVIAS).pipe(
        map((action: GetTriviasAction) => {
            return action.payload;
        }),
        mergeMap((payload: number) => {
            return this.api.getTrivias(payload).pipe(
                mergeMap((res: Trivia[]) => {
                    const items = toIndexedList(res);
                    return [
                        new GetTriviasSuccessAction(),
                        new SetTriviasAction(items),
                    ];
                }),
                catchError(() => {
                    return [new GetTriviasFailAction()];
                })
            );
        }),
    );

    @Effect() saveTrivia: Observable<any> = this.actions$.ofType(SAVE_TRIVIA).pipe(
        map((action: SaveTriviaAction) => {
            const payload = { ...action.payload };
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return <Trivia>payload;
        }),
        mergeMap((payload: Trivia) => {
            return this.api.saveTrivia(payload).pipe(
                mergeMap((res: Trivia) => {
                    return [
                        new AddTriviaAction(res),
                        new SaveTriviaSuccessAction(res)
                    ];
                }),
                catchError(() => {
                    return [new SaveTriviaFailAction()];
                })
            );
        }),
    );

    @Effect() deleteTrivia: Observable<any> = this.actions$.ofType(DELETE_TRIVIA).pipe(
        map((action: DeleteTriviaAction) => action.payload),
        mergeMap((payload: Trivia) => {
            return this.api.deleteTrivia(payload).pipe(
                mergeMap(() => {
                    return [
                        new RemoveTriviaAction(payload),
                        new DeleteTriviaSuccessAction(payload),
                    ];
                }),
                catchError(() => {
                    return [new DeleteTriviaFailAction()];
                })
            );
        })
    );
}
