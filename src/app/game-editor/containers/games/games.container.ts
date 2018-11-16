import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '@app/core';
import { selectUser } from '@app/profile';
import { FormDefinition } from '@app/dynamic-forms';
import { composeGameForm } from '../../forms';

import { formKeys, FetchItemsAction, getItems } from '../../state';
import { SmartBase } from '../../mixins';
import { map } from 'rxjs/operators';

@Component({
    selector: 'rg-games-container',
    templateUrl: './games.container.html',
    styleUrls: ['./games.container.scss']
})
export class GamesContainerComponent extends SmartBase implements OnInit {

    readonly key = formKeys.GAMES;

    formDefinition: FormDefinition = composeGameForm;

    constructor(public store: Store<AppState>) {
        super(store);
    }

    ngOnInit() {
        this.sub = this.store
            .pipe(
                select(selectUser),
                map(user => {
                    this.store.dispatch(new FetchItemsAction({ key: this.key, data: user && user.id }));
                })
            )
            .subscribe();

        this.items$ = this.store.pipe(select(getItems(this.key)));
    }
}
