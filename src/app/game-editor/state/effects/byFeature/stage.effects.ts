// import { Injectable } from '@angular/core';
// import { Actions, Effect } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import { map, mergeMap, catchError } from 'rxjs/operators';

// import { GameEditService } from '../../../../core';
// import { Stage } from '../../../../game-mechanics';
// import {
//     GetStagesAction,
//     SetStagesAction,
//     GetStagesSuccessAction,
//     GetStagesFailAction,
//     SaveStageAction,
//     SaveStageSuccessAction,
//     SaveStageFailAction,
//     AddStageAction,
//     DeleteStageAction,
//     DeleteStageSuccessAction,
//     DeleteStageFailAction,
//     RemoveStageAction
// } from '../../actions';

// import { GET_STAGES, SAVE_STAGE, DELETE_STAGE } from '../../reducers';
// import { toIndexedList } from '../../../../shared';

// @Injectable()
// export class StageEffectsService {

//     constructor(private actions$: Actions, private api: GameEditService) {
//     }

//     @Effect() getStages: Observable<any> = this.actions$.ofType(GET_STAGES).pipe(
//         map((action: GetStagesAction) => {
//             return action.payload;
//         }),
//         mergeMap((payload: number) => {
//             return this.api.getStages(payload).pipe(
//                 mergeMap((res: Stage[]) => {
//                     const items = toIndexedList(res);
//                     return [
//                         new GetStagesSuccessAction(),
//                         new SetStagesAction(items),
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new GetStagesFailAction()];
//                 })
//             );
//         }),
//     );

//     @Effect() saveStage: Observable<any> = this.actions$.ofType(SAVE_STAGE).pipe(
//         map((action: SaveStageAction) => {
//             const payload = { ...action.payload };
//             if (typeof payload.image === 'string') {
//                 delete payload.image;
//             }
//             return <Stage>payload;
//         }),
//         mergeMap((payload: Stage) => {
//             return this.api.saveStage(payload).pipe(
//                 mergeMap((res: Stage) => {
//                     return [
//                         new AddStageAction(res),
//                         new SaveStageSuccessAction(res)
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new SaveStageFailAction()];
//                 })
//             );
//         }),
//     );

//     @Effect() deleteStage: Observable<any> = this.actions$.ofType(DELETE_STAGE).pipe(
//         map((action: DeleteStageAction) => action.payload),
//         mergeMap((payload: Stage) => {
//             return this.api.deleteStage(payload).pipe(
//                 mergeMap(() => {
//                     return [
//                         new RemoveStageAction(payload),
//                         new DeleteStageSuccessAction(payload),
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new DeleteStageFailAction()];
//                 })
//             );
//         })
//     );
// }
