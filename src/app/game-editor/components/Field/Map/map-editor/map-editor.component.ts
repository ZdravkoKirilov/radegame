import {
    Component, ViewChild, ElementRef, ChangeDetectionStrategy,
    OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BoardField, MapLocation, MapPath } from '../../../../../game-mechanics/models/index';
import { SceneRenderService } from '../../../../../game-mechanics/rendering/scene-render.service';
import { KEYCODES } from '../../../../utils/config';
import { composeDefaultLoc } from '../../../../utils/utils';
import { propHasChanged, propHasNewValue } from '../../../../../shared/utils/propsCheck';

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
    @Output() createPath: EventEmitter<MapPath> = new EventEmitter();
    @Output() deletePath: EventEmitter<MapPath> = new EventEmitter();
    @Output() selectPath: EventEmitter<number> = new EventEmitter();
    @Output() editField: EventEmitter<any> = new EventEmitter();

    @Input() canvasImage: string;
    @Input() fields: BoardField[];
    @Input() lastInsertedField: number;
    @Input() mapLocations: { [key: string]: MapLocation } = {};
    @Input() mapPaths: MapPath[];
    @Input() showFieldEditor: boolean;
    @Input() pathCreationMode: boolean;
    @Input() selectedField: BoardField;
    @Input() selectedPath: MapPath;

    private subs: Subscription[] = [];


    constructor(private scr: SceneRenderService) {
    }

    fieldWasSaved(field: BoardField) {
        this.handleFieldEditorToggle(false);
    }

    handleFieldEditorToggle(value) {
        this.deselectField.emit();
        this.toggleFieldEditor.emit(value);
    }

    attachListeners() {
        const {scr} = this;

        const nodeMoved = scr.nodeMoved
            .subscribe((loc: MapLocation) => {
                this.saveMapLocation.emit(loc);
            });
        const nodeSelected = scr.nodeSelected.subscribe((loc: MapLocation) => {
            const currentSelect = this.selectedField;
            if (this.pathCreationMode && currentSelect) {
                const fromLoc = this.mapLocations[currentSelect.id].id;
                const toLoc = this.mapLocations[loc.field].id;
                if (fromLoc && toLoc) {
                    const payload: MapPath = {fromLoc, toLoc};
                    this.createPath.emit(payload);
                    this.selectField.emit(null);
                }
            } else {
                this.selectField.emit(loc.field);
            }

        });
        const pathSelected = scr.pathSelected.subscribe((data: MapPath) => {
            this.selectPath.emit(data.id);
        });
        const keypress = scr.keypress.subscribe(event => {
            const field = this.selectedField;
            const path = this.selectedPath;
            if (event.keyCode === KEYCODES.Delete) {
                if (field) {
                    const payload = this.fields.find(elem => elem.id === field.id);
                    this.deleteMapField.emit(payload);
                }
                if (path) {
                    const payload = this.mapPaths.find(elem => elem.id === path.id);
                    this.deletePath.emit(payload);
                }
            }

            if (event.keyCode === KEYCODES.Enter) {
                if (field) {
                    this.editField.emit();
                }
            }
        });
        this.subs = [nodeMoved, nodeSelected, pathSelected, keypress];
    }

    ngOnInit() {
        this.scr.initialize(this.canvasWrapper.nativeElement);
        this.scr.updateBackground(this.canvasImage);
        this.attachListeners();
    }

    ngOnChanges(c: SimpleChanges) {
        if (propHasChanged(c, 'canvasImage')) {
            this.scr.updateBackground(c.canvasImage.currentValue);
        }
        if (propHasNewValue(c, 'lastInsertedField')) {
            const data = composeDefaultLoc(this.fields, this.lastInsertedField);
            this.saveMapLocation.emit(data);
        }
    }

    ngOnDestroy() {
        this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    }
}
