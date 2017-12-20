import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

import {AppState} from '../../../core/state/index';
import * as actions from '../../state/actions/byFeature/metadata.action';
import {GameMetadata} from '../../../game-mechanics/models/index';
import {BaseControl} from '../../../dynamic-forms/models/Base.model';
import {METADATA_DEF} from '../../utils/form-definitions';
import {selectMovementsAsOptionsList} from '../../state/reducers/byFeature/assets.reducer';
import {Option} from '../../../dynamic-forms/models/Base.model';
import 'rxjs/add/operator/take';

@Component({
    selector: 'rg-smart-general-settings',
    templateUrl: './smart-general-settings.component.html',
    styleUrls: ['./smart-general-settings.component.scss']
})
export class SmartGeneralSettingsComponent implements OnInit, OnDestroy {
    readonly storeBranch: string = 'metadata';
    public formDefinition: BaseControl[];
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
        this.storeSub = this.store.take(1).subscribe(state => {
            const movements: Option[] = selectMovementsAsOptionsList(state);
            this.formDefinition = this.formDefinition ? this.formDefinition : METADATA_DEF(movements);
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}
