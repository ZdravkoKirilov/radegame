import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../../services/game-edit.service';
import { Game } from '../../../../game-mechanics/models/index';

import { UpdateEditorAssetsAction, GetGameAction, GetGameSuccessAction, GetGameFailAction } from '../../actions/byFeature/asset.action';

import { GET_GAME } from '../../reducers/byFeature/assets.reducer';

@Injectable()
export class AssetEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getGame: Observable<any> = this.actions$
        .ofType(GET_GAME)
        .map((action: GetGameAction) => {
            return action.payload;
        })
        .mergeMap((gameId: number) => {
            return this.api.getGame(gameId);
        })
        .mergeMap((game: Game) => {
            return [
                new GetGameSuccessAction(),
                new UpdateEditorAssetsAction({
                    game,
                })
            ];
        })
        .catch(() => {
            return [new GetGameFailAction()];
        });
}
