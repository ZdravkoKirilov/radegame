import {
    Component, ViewChild, ElementRef, ChangeDetectionStrategy,
    OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Field, LocationEntity, PathEntity, Stage, SceneRenderService } from '@app/game-mechanics';
import { KEYCODES } from '../../../../utils';
import { propHasChanged, getPropValue } from '@app/shared';

@Component({
    selector: 'rg-map-editor',
    templateUrl: './map-editor.component.html',
    styleUrls: ['./map-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapEditorComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('canvasWrapper') canvasWrapper: ElementRef;

    @Output() changeBackground: EventEmitter<any> = new EventEmitter();
    @Output() saveMapLocation: EventEmitter<LocationEntity> = new EventEmitter();
    @Output() deleteField: EventEmitter<any> = new EventEmitter();
    @Output() selectField: EventEmitter<number> = new EventEmitter();
    @Output() setPathCreation: EventEmitter<boolean> = new EventEmitter();
    @Output() createPath: EventEmitter<PathEntity> = new EventEmitter();
    @Output() deletePath: EventEmitter<PathEntity> = new EventEmitter();
    @Output() selectPath: EventEmitter<PathEntity> = new EventEmitter();
    @Output() editField: EventEmitter<any> = new EventEmitter();

    @Input() stage: Stage;
    @Input() fields: Field[];
    @Input() lastInsertedField: number;
    @Input() mapLocations: { [key: string]: LocationEntity } = {};
    @Input() mapPaths: PathEntity[];
    @Input() hidden: boolean;
    @Input() pathCreationMode: boolean;
    @Input() selectedField: Field;
    @Input() selectedPath: PathEntity;

    private subs: Subscription[] = [];


    constructor(private scr: SceneRenderService) {
    }

    handleAddField() {
        this.editField.emit(null);
    }

    attachListeners() {
        const { scr } = this;

        const nodeMoved = scr.nodeMoved
            .subscribe((loc: LocationEntity) => {
                this.saveMapLocation.emit(loc);
            });
        const nodeSelected = scr.nodeSelected.subscribe((loc: LocationEntity) => {
            const currentSelect = this.selectedField;
            if (this.pathCreationMode && currentSelect) {
                const fromLoc = this.mapLocations[currentSelect.id].id;
                const toLoc = this.mapLocations[loc.field as any].id;
                if (fromLoc && toLoc) {
                    const payload: PathEntity = { fromLoc, toLoc };
                    this.createPath.emit(payload);
                    this.selectField.emit(null);
                }
            } else {
                this.selectPath.emit(null);
                // this.selectField.emit(loc.field);
            }

        });
        const pathSelected = scr.pathSelected.subscribe((data: PathEntity) => {
            this.selectField.emit(null);
            this.selectPath.emit(data);
        });
        const keypress = scr.keypress.subscribe(event => {
            const field = this.selectedField;
            const path = this.selectedPath;
            if (event.keyCode === KEYCODES.Delete) {
                if (field) {
                    const payload = this.fields.find(elem => elem.id === field.id);
                    this.deleteField.emit(payload);
                }
                if (path) {
                    const payload = this.mapPaths.find(elem => elem.id === path.id);
                    this.deletePath.emit(payload);
                }
            }

            if (event.keyCode === KEYCODES.Enter) {
                if (field) {
                    this.editField.emit(field);
                }
            }
        });
        this.subs = [nodeMoved, nodeSelected, pathSelected, keypress];
    }

    ngOnInit() {
        // this.scr.initialize(this.canvasWrapper.nativeElement);
        // this.scr.updateBackground(this.stage.image);
        // this.attachListeners();
    }

    ngOnChanges(c: SimpleChanges) {
        if (propHasChanged(c, 'stage')) {
            this.scr.updateBackground(c.stage.currentValue.image);
        }
        if (propHasChanged(c, 'selectedPath')) {
            this.scr.changeSelectedPath(this.selectedPath ? this.selectedPath.id : null, getPropValue(c, 'selectedPath'));
        }
        if (propHasChanged(c, 'selectedField')) {
            const id = this.mapLocations && this.selectedField && this.mapLocations[this.selectedField.id] ? this.mapLocations[this.selectedField.id].id : null;
            this.scr.changeSelectedNode(id, getPropValue(c, 'selectedField'));
        }
    }

    ngOnDestroy() {
        this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    }
}
