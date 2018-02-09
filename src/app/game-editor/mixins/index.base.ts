import { Input, Output, EventEmitter } from '@angular/core';

import { FormDefinition } from '../../dynamic-forms/models/FormDefinition.model';
import { ConnectedEntities } from '../../dynamic-forms/models/ConnectedEntities';

export abstract class IndexBase<T> {

    @Input() showEditor: boolean;
    @Input() selectedItem: T;
    @Input() items: T[];
    @Input() formDefinition: FormDefinition;
    @Input() connectedEntities: ConnectedEntities;

    @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() editItem: EventEmitter<T> = new EventEmitter();
    @Output() saveItem: EventEmitter<T> = new EventEmitter();
    @Output() removeItem: EventEmitter<T> = new EventEmitter();

    showItemEditor() {
        this.toggleEditor.emit(true);
    }

    hideItemEditor() {
        this.toggleEditor.emit(false);
    }

}