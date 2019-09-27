import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeStageForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';


@Component({
    selector: 'rg-stages-container',
    templateUrl: './stages.container.html',
    styleUrls: ['./stages.container.scss']
})
export class StagesContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = composeStageForm;
    public readonly key: AllEntity = ALL_ENTITIES.stages ;

    constructor(public store: Store<AppState>) {
        super(store);
    }
}
