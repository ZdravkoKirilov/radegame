// import { Injectable } from '@angular/core';
// import { Actions, Effect } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import { map, mergeMap, catchError } from 'rxjs/operators';

// import { GameEditService } from '../../../../core';
// import { Resource } from '../../../../game-mechanics';

// import {
//     GetResourcesAction,
//     GetResourcesSuccessAction,
//     GetResourcesFailAction,
//     SetResourcesAction,
//     AddResourceAction,
//     DeleteResourceAction,
//     DeleteResourceFailAction,
//     DeleteResourceSuccessAction,
//     RemoveResourceAction,
//     SaveResourceAction,
//     SaveResourceFailAction,
//     SaveResourceSuccessAction
// } from '../../actions';


// import { OperationFailAction, OperationSuccessAction } from '../../../../core';
// import { systemMessages as sm, toIndexedList } from '../../../../shared';
// import { DELETE_RESOURCE, GET_RESOURCES, SAVE_RESOURCE } from '../../reducers';

// @Injectable()
// export class ResourceEffectsService {

//     constructor(private actions$: Actions, private api: GameEditService) {
//     }

//     @Effect() getResources: Observable<any> = this.actions$.ofType(GET_RESOURCES).pipe(
//         map((action: GetResourcesAction) => {
//             return action.payload;
//         }),
//         mergeMap((payload: number) => {
//             return this.api.getResources(payload).pipe(
//                 mergeMap((res: Resource[]) => {
//                     const items = toIndexedList(res);
//                     return [
//                         new GetResourcesSuccessAction(),
//                         new SetResourcesAction(items)
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new GetResourcesFailAction()];
//                 })
//             );
//         }),
//     );

//     @Effect() saveResource: Observable<any> = this.actions$.ofType(SAVE_RESOURCE).pipe(
//         map((action: SaveResourceAction) => {
//             const payload = { ...action.payload };
//             if (typeof payload.image === 'string') {
//                 delete payload.image;
//             }
//             return payload;
//         }),
//         mergeMap((payload: Resource) => {
//             return this.api.saveResource(payload).pipe(
//                 mergeMap((res: Resource) => {
//                     return [
//                         new AddResourceAction(res),
//                         new SaveResourceSuccessAction(res),
//                         new OperationSuccessAction(sm.SAVE_RESOURCE_SUCCESS)
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new SaveResourceFailAction(), new OperationFailAction(sm.SAVE_RESOURCE_FAIL)];
//                 })
//             );
//         }),
//     );

//     @Effect() deleteResource: Observable<any> = this.actions$.ofType(DELETE_RESOURCE).pipe(
//         map((action: DeleteResourceAction) => action.payload),
//         mergeMap((payload: Resource) => {
//             return this.api.deleteResource(payload).pipe(
//                 mergeMap(() => {
//                     return [
//                         new RemoveResourceAction(payload),
//                         new DeleteResourceSuccessAction(payload),
//                         new OperationSuccessAction(sm.DELETE_RESOURCE_SUCCESS)
//                     ];
//                 }),
//                 catchError(() => {
//                     return [new DeleteResourceFailAction(), new OperationFailAction(sm.DELETE_RESOURCE_FAIL)];
//                 })
//             );
//         })
//     );
// }
