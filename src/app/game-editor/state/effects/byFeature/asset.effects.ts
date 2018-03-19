import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GameEditService } from '../../../../core';
import { Game } from '../../../../game-mechanics';

import { UpdateEditorAssetsAction, GetGameAction, GetGameSuccessAction, GetGameFailAction } from '../../actions';

import { GET_GAME } from '../../reducers';

@Injectable()
export class AssetEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getGame: Observable<any> = this.actions$.ofType(GET_GAME).pipe(
        map((action: GetGameAction) => {
            return action.payload;
        }),
        mergeMap((gameId: number) => {
            return this.api.getGame(gameId).pipe(
                mergeMap((game: Game) => {
                    return [
                        new GetGameSuccessAction(),
                        new UpdateEditorAssetsAction({
                            game,
                        })
                    ];
                }),
                catchError(() => {
                    return [new GetGameFailAction()];
                })
            );
        })
    );
}
