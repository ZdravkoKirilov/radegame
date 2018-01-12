import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BoardField, MapPath, MapLocationList, GameMap, Resource, MapLocation } from '../../../../game-mechanics/models/index';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';

@Component({
    selector: 'rg-fields',
    templateUrl: './fields.component.html',
    styleUrls: ['./fields.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsComponent {

    @Output() editField: EventEmitter<BoardField> = new EventEmitter();
    @Output() saveField: EventEmitter<BoardField> = new EventEmitter();
    @Output() removeField: EventEmitter<BoardField> = new EventEmitter();
    @Output() selectField: EventEmitter<BoardField> = new EventEmitter();

    @Output() savePath: EventEmitter<MapPath> = new EventEmitter();
    @Output() removePath: EventEmitter<MapPath> = new EventEmitter();
    @Output() selectPath: EventEmitter<MapPath> = new EventEmitter();

    @Output() saveMapLocation: EventEmitter<MapLocation> = new EventEmitter();

    @Output() setPathCreation: EventEmitter<boolean> = new EventEmitter();
    @Output() closeFieldEditor: EventEmitter<any> = new EventEmitter();

    @Input() showFieldEditor: boolean;

    @Input() selectedField: BoardField;
    @Input() selectedPath: MapPath;

    @Input() formDefinition: FormDefinition;

    @Input() fields: BoardField[];
    @Input() paths: MapPath[];
    @Input() locations: MapLocationList;
    @Input() map: GameMap;

    @Input() resources: Resource[];

    @Input() pathCreationMode: boolean;

    constructor() {
    }
}
