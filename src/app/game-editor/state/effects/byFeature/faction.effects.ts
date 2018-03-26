// import { Injectable } from '@angular/core';
// import { Actions, Effect } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import { map, mergeMap, catchError } from 'rxjs/operators';

// import { GameEditService } from '../../../../core';
// import { Faction } from '../../../../game-mechanics';
// import {
//     AddFactionAction,
//     DeleteFactionFailAction,
//     DeleteFactionSuccessAction,
//     RemoveFactionAction,
//     SaveFactionFailAction,
//     SaveFactionSuccessAction,
//     GetFactionsAction,
//     GetFactionsSuccessAction,
//     GetFactionsFailAction,
//     SetFactionsAction,
//     SaveFactionAction,
//     DeleteFactionAction
// } from '../../actions';

// import { OperationFailAction, OperationSuccessAction } from '../../../../core';
// import { systemMessages as sm, toIndexedList } from '../../../../shared';
// import { DELETE_FACTION, SAVE_FACTION, GET_FACTIONS } from '../../reducers';

// @Injectable()
// export class FactionEffectsService {

//     constructor(private actions$: Actions, private api: GameEditService) {
//     }

//     @Effect() getFactions: Observable<any> = this.actions$.ofType(GET_FACTIONS).pipe(
//         map((action: GetFactionsAction) => {
//             return action.payload;
//         }),
//         mergeMap((payload: number) => {
//             return this.api.getFactions(payload).pipe(
//                 mergeMap((res: Faction[]) => {
//                     const factions = toIndexedList(res);
//                     return [
//                         new GetFactionsSuccessAction(),
//                         new SetFactionsAction(factions)
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new GetFactionsFailAction()];
//                 })
//             );
//         }),
//     );

//     @Effect() saveFaction: Observable<any> = this.actions$.ofType(SAVE_FACTION).pipe(
//         map((action: SaveFactionAction) => {
//             const payload = { ...action.payload };
//             if (typeof payload.image === 'string') {
//                 delete payload.image;
//             }
//             return payload;
//         }),
//         mergeMap((payload: Faction) => {
//             return this.api.saveFaction(payload).pipe(
//                 mergeMap((res: Faction) => {
//                     return [
//                         new AddFactionAction(res),
//                         new SaveFactionSuccessAction(res),
//                         new OperationSuccessAction(sm.SAVE_FACTION_SUCCESS)
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new SaveFactionFailAction(), new OperationFailAction(sm.SAVE_FACTION_FAIL)];
//                 })
//             );
//         }),
//     );

//     @Effect() deleteFaction: Observable<any> = this.actions$.ofType(DELETE_FACTION).pipe(
//         map((action: DeleteFactionAction) => action.payload),
//         mergeMap((payload: Faction) => {
//             return this.api.deleteFaction(payload).pipe(
//                 mergeMap(() => {
//                     return [
//                         new RemoveFactionAction(payload),
//                         new DeleteFactionSuccessAction(payload),
//                         new OperationSuccessAction(sm.DELETE_FACTION_SUCCESS)
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new DeleteFactionFailAction(), new OperationFailAction(sm.DELETE_FACTION_FAIL)];
//                 })
//             );
//         })
//     );


// }
