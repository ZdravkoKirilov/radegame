import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { GameEditService } from '../../../services/game-edit.service';
import { Resource } from '../../../../game-mechanics/models/index';

import {
    GetResourcesAction,
    GetResourcesSuccessAction,
    GetResourcesFailAction,
    SetResourcesAction,
    AddResourceAction,
    DeleteResourceAction,
    DeleteResourceFailAction,
    DeleteResourceSuccessAction,
    RemoveResourceAction,
    SaveResourceAction,
    SaveResourceFailAction,
    SaveResourceSuccessAction
} from '../../actions/byFeature/resource.action';


import { OperationFailAction, OperationSuccessAction } from '../../../../core/state/actions/actions';
import { systemMessages as sm } from '../../../../shared/config/messages';
import { DELETE_RESOURCE, GET_RESOURCES, SAVE_RESOURCE } from '../../reducers/byFeature/resources.reducer';
import { toIndexedList } from '../../../../shared/utils/utils';

@Injectable()
export class ResourceEffectsService {

    constructor(private actions$: Actions, private api: GameEditService) {
    }

    @Effect() getResources: Observable<any> = this.actions$
        .ofType(GET_RESOURCES)
        .map((action: GetResourcesAction) => {
            return action.payload;
        })
        .mergeMap((payload: number) => {
            return this.api.getResources(payload);
        })
        .mergeMap((res: Resource[]) => {
            const items = toIndexedList(res);
            return [
                new GetResourcesSuccessAction(),
                new SetResourcesAction(items)
            ];
        })
        .catch(() => {
            return [new GetResourcesFailAction()];
        });

    @Effect() saveResource: Observable<any> = this.actions$
        .ofType(SAVE_RESOURCE)
        .map((action: SaveResourceAction) => {
            const payload = {...action.payload};
            if (typeof payload.image === 'string') {
                delete payload.image;
            }
            return payload;
        })
        .mergeMap((payload: Resource) => {
            return this.api.saveResource(payload);
        })
        .mergeMap((res: Resource) => {
            return [
                new AddResourceAction(res),
                new SaveResourceSuccessAction(res),
                new OperationSuccessAction(sm.SAVE_RESOURCE_SUCCESS)
            ];
        })
        .catch(() => {
            return [new SaveResourceFailAction(), new OperationFailAction(sm.SAVE_RESOURCE_FAIL)];
        });

    @Effect() deleteResource: Observable<any> = this.actions$
        .ofType(DELETE_RESOURCE)
        .map((action: DeleteResourceAction) => action.payload)
        .mergeMap((payload: Resource) => {
            return this.api.deleteResource(payload)
                .mergeMap(() => {
                    return [
                        new RemoveResourceAction(payload),
                        new DeleteResourceSuccessAction(payload),
                        new OperationSuccessAction(sm.DELETE_RESOURCE_SUCCESS)
                    ];
                })
                .catch(() => {
                    return [new DeleteResourceFailAction(), new OperationFailAction(sm.DELETE_RESOURCE_FAIL)];
                });
        });
}
