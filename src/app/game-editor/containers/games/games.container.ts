import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AppState } from '@app/core';
import { selectUser } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeGameForm } from '../../forms';
import { FetchItemsAction, getItems, getSelectedEntity, getEditorState, getEntities } from '../../state';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';
import { AutoUnsubscribe } from '@app/shared';

@Component({
    selector: 'rg-games-container',
    templateUrl: './games.container.html',
    styleUrls: ['./games.container.scss']
})
@AutoUnsubscribe()
export class GamesContainerComponent extends SmartBase implements OnInit {

    readonly key = ALL_ENTITIES.games ;
    private user$: Subscription;

    showEditor$: Observable<boolean>;

    formDefinition: FormDefinition = composeGameForm;

    private hasLoadedDependencies = false;

    constructor(public store: Store<AppState>) {
        super(store);
    }

    ngOnInit() {
        this.user$ = this.store
            .pipe(
                select(selectUser),
                map(user => {
                    this.store.dispatch(new FetchItemsAction({ key: this.key, data: user && user.id }));
                })
            )
            .subscribe();

        this.items$ = this.store.pipe(
            select(getItems(this.key)),
            filter(games => !!games),
            map(games => {
                if (!this.hasLoadedDependencies) {
                    games.forEach(elem => {
                        this.store.dispatch(new FetchItemsAction({
                            key: ALL_ENTITIES.modules as AllEntity,
                            data: elem.id
                        }));
                        this.store.dispatch(new FetchItemsAction({
                            key: ALL_ENTITIES.images as AllEntity,
                            data: elem.id
                        }));
                    });
                    this.hasLoadedDependencies = true;
                }
                return games;
            }),
        );

        this.showEditor$ = this.store.pipe(select(getEditorState(this.key)));
        this.selectedItem$ = this.store.pipe(
            select(getSelectedEntity(this.key)),
            map(item => {
                this.selectedItem = item;
                return item;
            }),
        );
        this.connectedEntities$ = this.store.pipe(select(getEntities));
    }
}
