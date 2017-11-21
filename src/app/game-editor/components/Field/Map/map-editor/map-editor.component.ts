import {
    Component, ViewChild, ElementRef, ChangeDetectionStrategy,
    OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {BoardField, MapLocation, MapPath} from '../../../../../game-mechanics/models/index';
import {RenderingService} from '../../../../../game-mechanics/services/rendering.service';
import {SceneRenderService} from '../../../../../game-mechanics/rendering/scene-render.service';
import {KEYCODES} from '../../../../utils/config';
import {composeDefaultLoc} from '../../../../utils/utils';
import {propHasChanged, propHasNewValue} from '../../../../../shared/utils/propsCheck';

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


    constructor(private rs: RenderingService, private scr: SceneRenderService) {
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
            if (event.keyCode === KEYCODES.Delete) {
                const field = this.selectedField;
                const path = this.selectedPath;
                if (field) {
                    const payload = this.fields.find(elem => elem.id === field.id);
                    this.deleteMapField.emit(payload);
                }
                if (path) {
                    const payload = this.mapPaths.find(elem => elem.id === path.id);
                    this.deletePath.emit(payload);
                }
            }
        });
        this.subs = [nodeMoved, nodeSelected, pathSelected, keypress];
        // const {rs} = this;
        // const objAdded = rs.objectAdded
        //     .subscribe((obj: MapLocation) => {
        //         if (!obj.id) {
        //
        //         }
        //     });
        // const objModified = rs.objectModified
        //     .subscribe((obj: MapLocation) => {
        //         this.saveMapLocation.emit(obj);
        //     });
        // const onEnter = rs.onEnterKey
        //     .subscribe(() => {
        //         if (!this.pathCreationMode) {
        //             this.toggleFieldEditor.emit(true);
        //         }
        //     });
        // const onDelete = rs.onDeleteKey
        //     .subscribe((obj: FabricObject) => {
        //         if (obj.type === 'line') {
        //             this.deletePath.emit({...this.selectedPath});
        //         } else {
        //             this.deleteMapField.emit({...this.selectedField});
        //         }
        //     });
        // const onFieldSelect = rs.objectSelected
        //     .subscribe((obj: MapLocation) => {
        //         const selected = this.selectedField ? this.selectedField.id : null;
        //         if (this.pathCreationMode && obj && selected) {
        //             const fromLoc = this.mapLocations[selected].id;
        //             const toLoc = this.mapLocations[obj.field].id;
        //             if (fromLoc && toLoc) {
        //                 const payload: MapPath = {fromLoc, toLoc};
        //                 this.createPath.emit(payload);
        //             }
        //         }
        //         this.selectField.emit(obj.field);
        //     });
        // const onPathSelect = rs.pathSelected
        //     .subscribe((pathId: number) => {
        //         this.selectPath.emit(pathId);
        //     });
        // const onPathDeselect = rs.objectDeselected
        //     .subscribe(() => {
        //         this.selectPath.emit(null);
        //     });
        // const onFieldDeselect = rs.objectDeselected
        //     .subscribe(() => {
        //         if (this.pathCreationMode) {
        //             this.selectField.emit(null);
        //         }
        //     });
        //
        // this.subs = [objAdded, objModified, onEnter,
        //     onDelete, onFieldSelect, onFieldDeselect, onPathSelect, onPathDeselect];
    }

    ngOnInit() {
        // this.rs.initialize('fCanvas', this.canvasWrapper);
        // this.rs.attachListeners();
        // this.rs.updateBackground(this.canvasImage);
        // this.attachListeners();
        this.scr.initialize(this.canvasWrapper.nativeElement);
        this.scr.updateBackground(this.canvasImage);
        this.attachListeners();
    }

    ngOnChanges(c: SimpleChanges) {
        if (this.rs && propHasChanged(c, 'canvasImage')) {
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
