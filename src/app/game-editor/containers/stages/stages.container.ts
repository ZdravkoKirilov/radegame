import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeStageForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES, Stage} from '@app/game-mechanics';
import { SaveItemAction } from '../../state';


@Component({
    selector: 'rg-stages-container',
    templateUrl: './stages.container.html',
    styleUrls: ['./stages.container.scss']
})
export class StagesContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = composeStageForm;
    public readonly key: AllEntity = ALL_ENTITIES.stages;
    public selectedItem: Stage;

    constructor(public store: Store<AppState>) {
        super(store);
    }

    saveItem(data: Stage) {
        const payload = { ...data, game: this.gameId, slots: data.slots || [] };
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
            payload.slots = this.selectedItem.slots;
        }
        this.store.dispatch(new SaveItemAction({
            key: this.key,
            data: payload
        }));
        this.toggleEditor(false);
    }
}
