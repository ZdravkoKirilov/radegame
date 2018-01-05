import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { selectBoardType } from '../../state/reducers/byFeature/assets.reducer';

@Component({
    selector: 'rg-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
    private boardType: string;
    private storeSub: Subscription;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.storeSub = this.store
            .subscribe(state => {
                this.boardType = selectBoardType(state);
            });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}
