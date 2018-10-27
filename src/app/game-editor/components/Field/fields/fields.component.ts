import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';

import { Field, StagePath, StageLocationList, StageLocation, Stage } from '@app/game-mechanics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';

@Component({
    selector: 'rg-fields',
    templateUrl: './fields.component.html',
    styleUrls: ['./fields.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsComponent {

    @Output() editField: EventEmitter<Field> = new EventEmitter();
    @Output() saveField: EventEmitter<Field> = new EventEmitter();
    @Output() removeField: EventEmitter<Field> = new EventEmitter();
    @Output() selectField: EventEmitter<Field> = new EventEmitter();
    @Output() savePath: EventEmitter<StagePath> = new EventEmitter();
    @Output() removePath: EventEmitter<StagePath> = new EventEmitter();
    @Output() selectPath: EventEmitter<StagePath> = new EventEmitter();
    @Output() saveMapLocation: EventEmitter<StageLocation> = new EventEmitter();
    @Output() setPathCreation: EventEmitter<boolean> = new EventEmitter();
    @Output() toggleFieldEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() toggleListView: EventEmitter<boolean> = new EventEmitter();
    @Output() saveMap: EventEmitter<any> = new EventEmitter();

    @Input() template: TemplateRef<any>;
    @Input() showFieldEditor: boolean;
    @Input() selectedField: Field;
    @Input() selectedPath: StagePath;
    @Input() formDefinition: FormDefinition;
    @Input() fields: Field[];
    @Input() paths: StagePath[];
    @Input() locations: StageLocationList;
    @Input() stage: Stage;
    @Input() connectedEntities: ConnectedEntities;
    @Input() pathCreationMode: boolean;
    @Input() asList: boolean;

    constructor() {
    }
}
