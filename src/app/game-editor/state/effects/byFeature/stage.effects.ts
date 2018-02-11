import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../../services/game-edit.service';
import { Stage } from '../../../../game-mechanics/models/index';
import {
    GetStagesAction,
    SetStagesAction,
    GetStagesSuccessAction,
    GetStagesFailAction,
    SaveStageAction,
    SaveStageSuccessAction,
    SaveStageFailAction,
    AddStageAction,
    DeleteStageAction,
    DeleteStageSuccessAction,
    DeleteStageFailAction,
    RemoveStageAction
} from '../../actions/byFeature/stage.action';

import { GET_STAGES, SAVE_STAGE, DELETE_STAGE } from '../../reducers/byFeature/stage.reducer';
import { toIndexedList } from '../../../../shared/utils/utils';

@Injectable()
export class StageEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getStages: Observable<any> = this.actions$
        .ofType(GET_STAGES)
        .map((action: GetStagesAction) => {
            return action.payload;
        })
        .mergeMap((payload: number) => {
            return this.api.getStages(payload);
        })
        .mergeMap((res: Stage[]) => {
            const items = toIndexedList(res);
            return [
                new GetStagesSuccessAction(),
                new SetStagesAction(items),
            ];
        })
        .catch(() => {
            return [new GetStagesFailAction()];
        });

    @Effect() saveStage: Observable<any> = this.actions$
        .ofType(SAVE_STAGE)
        .map((action: SaveStageAction) => {
            const payload = { ...action.payload };
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return <Stage>payload;
        })
        .mergeMap((payload: Stage) => {
            return this.api.saveStage(payload);
        })
        .mergeMap((res: Stage) => {
            return [
                new AddStageAction(res),
                new SaveStageSuccessAction(res)
            ];
        })
        .catch(() => {
            return [new SaveStageFailAction()];
        });

    @Effect() deleteStage: Observable<any> = this.actions$
        .ofType(DELETE_STAGE)
        .map((action: DeleteStageAction) => action.payload)
        .mergeMap((payload: Stage) => {
            return this.api.deleteStage(payload)
                .mergeMap(() => {
                    return [
                        new RemoveStageAction(payload),
                        new DeleteStageSuccessAction(payload),
                    ];
                })
                .catch(() => {
                    return [new DeleteStageFailAction()];
                });
        });
}
