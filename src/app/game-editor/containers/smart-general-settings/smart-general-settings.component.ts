import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state-store/index';
import * as actions from '../../state/actions/actions';
import { GameMetadata } from '../../../game-mechanics/models/index';
import { Observable } from 'rxjs/Observable';
import { selectAsset } from '../../state/reducers/selectors';

@Component({
    selector: 'rg-smart-general-settings',
    templateUrl: './smart-general-settings.component.html',
    styleUrls: ['./smart-general-settings.component.scss']
})
export class SmartGeneralSettingsComponent implements OnInit {
    readonly storeBranch: string = 'metadata';
    public allowedMovements: Observable<string[]>;

    constructor(private store: Store<AppState>) {
    }

    handleFormValueChange(data: GameMetadata): void {
        this.store.dispatch(new actions.UpdateFieldAction({
            branch: this.storeBranch,
            data
        }));
    }
    ngOnInit() {
        this.allowedMovements = this.store.map(state => selectAsset('supportedMovements')(state));
    }
}
