import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import {Resource, Game, GameData} from '../../../game-mechanics/models/index';
import {
    SetResourcesAction,
    ToggleEditorAction,
    DeleteResourceAction
} from '../../state/actions/byFeature/resourceActions';
import {selectResources, selectResourceEditorToggleState} from '../../state/reducers/selectors';
import {selectRouterData} from '../../../core/state/reducers/selectors';
import {AppState} from '../../../core/state/index';

@Component({
    selector: 'rg-smart-resources',
    templateUrl: './smart-resources.component.html',
    styleUrls: ['./smart-resources.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartResourcesComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;
    private game: Game;
    public resources: Resource[] = [];
    public showEditor = false;

    constructor(private store: Store<AppState>) {
    }

    removeResource(payload: Resource) {
        this.store.dispatch(new DeleteResourceAction(payload));
    }

    toggleEditor(flag: boolean) {
        this.store.dispatch(new ToggleEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.resources = selectResources(state);
            this.showEditor = selectResourceEditorToggleState(state);

            const gameData: GameData = selectRouterData('game')(state);
            if (!this.game) {
                this.store.dispatch(new SetResourcesAction(gameData.resources));
                this.game = gameData.game;
            }
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}
