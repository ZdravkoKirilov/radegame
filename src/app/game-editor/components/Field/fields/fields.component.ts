import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Field, MapPath, MapLocationList, GameMap, MapLocation } from '../../../../game-mechanics/models/index';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { ConnectedEntities } from '../../../../dynamic-forms/models/ConnectedEntities';

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

    @Output() savePath: EventEmitter<MapPath> = new EventEmitter();
    @Output() removePath: EventEmitter<MapPath> = new EventEmitter();
    @Output() selectPath: EventEmitter<MapPath> = new EventEmitter();

    @Output() saveMapLocation: EventEmitter<MapLocation> = new EventEmitter();

    @Output() setPathCreation: EventEmitter<boolean> = new EventEmitter();
    @Output() closeFieldEditor: EventEmitter<any> = new EventEmitter();

    @Input() showFieldEditor: boolean;

    @Input() selectedField: Field;
    @Input() selectedPath: MapPath;

    @Input() formDefinition: FormDefinition;

    @Input() fields: Field[];
    @Input() paths: MapPath[];
    @Input() locations: MapLocationList;
    @Input() map: GameMap;

    @Input() connectedEntities: ConnectedEntities;

    @Input() pathCreationMode: boolean;

    constructor() {
    }
}
