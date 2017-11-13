import {
    Component, ViewChild, ElementRef, ChangeDetectionStrategy,
    OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {BoardField, MapLocation} from '../../../../../game-mechanics/models/index';
import {RenderingService} from '../../../../../game-mechanics/services/rendering.service';

@Component({
    selector: 'rg-map-editor',
    templateUrl: './map-editor.component.html',
    styleUrls: ['./map-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapEditorComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('canvasWrapper') canvasWrapper: ElementRef;

    @Output() addBackground: EventEmitter<any> = new EventEmitter();
    @Output() removeBackground: EventEmitter<any> = new EventEmitter();
    @Output() saveMapLocation: EventEmitter<MapLocation> = new EventEmitter();
    @Output() deleteMapField: EventEmitter<any> = new EventEmitter();
    @Output() selectField: EventEmitter<number> = new EventEmitter();
    @Output() deselectField: EventEmitter<number> = new EventEmitter();
    @Output() toggleFieldEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() togglePathCreation: EventEmitter<boolean> = new EventEmitter();
    @Output() createPath: EventEmitter<number[]> = new EventEmitter();

    @Input() canvasImage: string;
    @Input() fields: BoardField[];
    @Input() mapLocations: { [key: string]: MapLocation } = {};
    @Input() showFieldEditor: boolean;
    @Input() pathCreationMode: boolean;
    @Input() selectedField: BoardField;

    private subs: Subscription[] = [];


    constructor(private canvas: RenderingService) {
    }

    fieldWasSaved(field: BoardField) {
        this.handleFieldEditorToggle(false);
    }

    handleFieldEditorToggle(value) {
        this.deselectField.emit();
        this.toggleFieldEditor.emit(value);
    }

    attachListeners() {
        const {canvas} = this;
        const objAdded = canvas.objectAdded
            .subscribe((obj: MapLocation) => {

            });
        const objModified = canvas.objectModified
            .subscribe((obj: MapLocation) => {
                this.saveMapLocation.emit(obj);
            });
        const onEnter = canvas.onEnterKey
            .subscribe(() => {
                if (!this.pathCreationMode) {
                    this.toggleFieldEditor.emit(true);
                }
            });
        const onDelete = canvas.onDeleteKey
            .subscribe(() => {
                this.deleteMapField.emit(this.selectedField);
            });
        const onFieldSelect = canvas.objectSelected
            .subscribe((obj: MapLocation) => {
                if (this.pathCreationMode) {
                    const selected = this.selectedField ? this.selectedField.id : null;
                    this.createPath.emit([selected, obj.field]);
                }
                this.selectField.emit(obj.field);
            });
        const onFieldDeselect = canvas.objectDeselected
            .subscribe(() => {
                if (this.pathCreationMode) {
                    this.selectField.emit(null);
                }
            });

        this.subs = [objAdded, objModified, onEnter,
            onDelete, onFieldSelect, onFieldDeselect];
    }

    hasLoadedLocations() {
        return this.mapLocations && Object.keys(this.mapLocations).length;
    }

    ngOnInit() {
        this.canvas.initialize('fCanvas', this.canvasWrapper);
        this.canvas.attachListeners();
        this.attachListeners();
    }

    ngOnChanges(c: SimpleChanges) {
        if (this.canvas && c.canvasImage &&
            c.canvasImage.currentValue !== c.canvasImage.previousValue) {
            this.canvas.updateBackground(c.canvasImage.currentValue);
        }
    }

    ngOnDestroy() {
        this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    }
}
