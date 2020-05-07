import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeModuleForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';

@Component({
    selector: 'rg-modules-container',
    templateUrl: './modules.container.html',
    styleUrls: ['./modules.container.scss']
})
export class ModulesContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = composeModuleForm;
    public readonly key: AllEntity = ALL_ENTITIES.modules ;


    constructor(public store: Store<AppState>) {
        super(store);
    }
}
