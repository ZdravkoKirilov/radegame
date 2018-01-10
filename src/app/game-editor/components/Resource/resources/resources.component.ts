import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Resource } from '../../../../game-mechanics/models/index';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';

@Component({
    selector: 'rg-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesComponent {

    constructor() {
    }

    @Input() items: Resource[];
    @Input() selectedItem: Resource;
    @Input() showEditor: boolean;
    @Input() formDefinition: FormDefinition;

    @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() editItem: EventEmitter<Resource> = new EventEmitter();
    @Output() removeItem: EventEmitter<Resource> = new EventEmitter();
    @Output() saveItem: EventEmitter<Resource> = new EventEmitter();

    showResourceEditor() {
        this.toggleEditor.emit(true);
    }

    hideResourceEditor() {
        this.toggleEditor.emit(false);
    }
}
