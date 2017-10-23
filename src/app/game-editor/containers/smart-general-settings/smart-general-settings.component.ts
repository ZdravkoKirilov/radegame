import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import {AppState} from '../../../state-store/index';
import * as actions from '../../state/actions/actions';
import {GameMetadata, Movement} from '../../../game-mechanics/models/index';
import {BaseControl} from '../../../dynamic-forms/models/Base';
import {GENERAL_SETTINGS} from '../../configs/form-definitions';
import {selectMovements, selectMovementsAsOptionsList} from '../../state/reducers/selectors';
import {Option} from '../../../dynamic-forms/models/Base';

@Component({
    selector: 'rg-smart-general-settings',
    templateUrl: './smart-general-settings.component.html',
    styleUrls: ['./smart-general-settings.component.scss']
})
export class SmartGeneralSettingsComponent implements OnInit, OnDestroy {
    readonly storeBranch: string = 'metadata';
    public formDefinition: BaseControl<any>[];
    private storeSub: Subscription;

    constructor(private store: Store<AppState>) {
    }


    handleFormValueChange(data: GameMetadata): void {
        this.store.dispatch(new actions.UpdateFieldAction({
            branch: this.storeBranch,
            data
        }));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            const movements: Movement[] = selectMovementsAsOptionsList(state);
            this.formDefinition = this.formDefinition ? this.formDefinition : GENERAL_SETTINGS(movements);
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}
