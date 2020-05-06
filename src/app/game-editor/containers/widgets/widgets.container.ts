import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { FormDefinition } from '@app/dynamic-forms';
import { composeWidgetForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES, Widget} from '@app/game-mechanics';
import { SaveItemAction } from '../../state';


@Component({
    selector: 'rg-widgets-container',
    templateUrl: './widgets.container.html',
    styleUrls: ['./widgets.container.scss']
})
export class WidgetsContainerComponent extends SmartBase {

    public formDefinition: FormDefinition = composeWidgetForm;
    public readonly key: AllEntity = ALL_ENTITIES.widgets;
    public selectedItem: Widget;

    constructor(public store: Store<AppState>) {
        super(store);
    }

    saveItem(data: Widget) {
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
