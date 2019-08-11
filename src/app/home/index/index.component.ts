import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { AutoUnsubscribe } from '@app/shared';
import { selectUser, User } from '@app/profile';

@Component({
    selector: 'rg-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
@AutoUnsubscribe()
export class IndexComponent implements OnInit {

    user$: Subscription;
    user: User;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.user$ = this.store.pipe(
            select(selectUser),
            map(user => {
                this.user = user;
            })
        ).subscribe();
    }

}
