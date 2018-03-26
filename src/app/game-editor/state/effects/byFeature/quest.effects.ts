// import { Injectable } from '@angular/core';
// import { Actions, Effect } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import { map, mergeMap, catchError } from 'rxjs/operators';

// import { GameEditService } from '../../../../core';
// import { Quest } from '../../../../game-mechanics';
// import {
//     GetQuestsAction,
//     SetQuestsAction,
//     GetQuestsSuccessAction,
//     GetQuestsFailAction,
//     SaveQuestAction,
//     SaveQuestSuccessAction,
//     SaveQuestFailAction,
//     AddQuestAction,
//     DeleteQuestAction,
//     DeleteQuestSuccessAction,
//     DeleteQuestFailAction,
//     RemoveQuestAction
// } from '../../actions';

// import { GET_QUESTS, SAVE_QUEST, DELETE_QUEST } from '../../reducers';
// import { toIndexedList } from '../../../../shared';

// @Injectable()
// export class QuestEffectsService {

//     constructor(private actions$: Actions, private api: GameEditService) {
//     }

//     @Effect() getQuests: Observable<any> = this.actions$.ofType(GET_QUESTS).pipe(
//         map((action: GetQuestsAction) => {
//             return action.payload;
//         }),
//         mergeMap((payload: number) => {
//             return this.api.getQuests(payload).pipe(
//                 mergeMap((res: Quest[]) => {
//                     const items = toIndexedList(res);
//                     return [
//                         new GetQuestsSuccessAction(),
//                         new SetQuestsAction(items)
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new GetQuestsFailAction()];
//                 })
//             );
//         }),
//     );

//     @Effect() saveQuest: Observable<any> = this.actions$.ofType(SAVE_QUEST).pipe(
//         map((action: SaveQuestAction) => {
//             const payload = { ...action.payload };
//             if (typeof payload.image === 'string') {
//                 delete payload.image;
//             }
//             return payload;
//         }),
//         mergeMap((payload: Quest) => {
//             return this.api.saveQuest(payload).pipe(
//                 mergeMap((res: Quest) => {
//                     return [
//                         new AddQuestAction(res),
//                         new SaveQuestSuccessAction(res)
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new SaveQuestFailAction()];
//                 })
//             );
//         }),
//     );

//     @Effect() deleteQuest: Observable<any> = this.actions$.ofType(DELETE_QUEST).pipe(
//         map((action: DeleteQuestAction) => action.payload),
//         mergeMap((payload: Quest) => {
//             return this.api.deleteQuest(payload).pipe(
//                 mergeMap(() => {
//                     return [
//                         new RemoveQuestAction(payload),
//                         new DeleteQuestSuccessAction(payload),
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new DeleteQuestFailAction()];
//                 })
//             );
//         })
//     );
// }
