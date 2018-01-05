import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Resource, Game, GameData } from '../../../game-mechanics/models/index';
import {
    SetResourcesAction,
    ToggleResourceEditorAction,
    DeleteResourceAction,
    ChangeSelectedResourceAction
} from '../../state/actions/byFeature/resource.action';
import { getSelectedResource } from '../../state/reducers/byFeature/resources.reducer';
import { selectRouterData } from '../../../core/state/reducers/selectors';
import { AppState } from '../../../core/state/index';
import { selectResourceEditorToggleState, selectResources } from '../../state/reducers/byFeature/resources.reducer';
import { selectGame } from '../../state/reducers/byFeature/assets.reducer';

@Component({
    selector: 'rg-smart-resources',
    templateUrl: './smart-resources.component.html',
    styleUrls: ['./smart-resources.component.scss']
})
export class SmartResourcesComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;
    public game: Game;
    public resources: Resource[] = [];
    public selectedItem: Resource;
    public showEditor = false;

    constructor(private store: Store<AppState>) {
    }

    editResource(payload: Resource) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    changeSelectedItem(payload: Resource) {
        this.store.dispatch(new ChangeSelectedResourceAction(payload));
    }

    removeResource(payload: Resource) {
        this.store.dispatch(new DeleteResourceAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleResourceEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.resources = selectResources(state);
            this.showEditor = selectResourceEditorToggleState(state);
            this.selectedItem = getSelectedResource(state);
            this.game = selectGame(state);
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}
