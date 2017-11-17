import {Component, OnInit, OnDestroy, OnChanges, Input, ChangeDetectionStrategy, SimpleChanges} from '@angular/core';

import {BoardField, MapLocation} from '../../../../../game-mechanics/models/index';
import {RenderingService} from '../../../../../game-mechanics/services/rendering.service';
import {SceneRenderService} from '../../../../../game-mechanics/rendering/scene-render.service';
import {FabricObjectData} from '../../../../../shared/models/FabricObject';
import {DEFAULT_MAP_LOCATION} from '../../../../configs/config';

@Component({
    selector: 'rg-map-field',
    templateUrl: './map-field.component.html',
    styleUrls: ['./map-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapFieldComponent implements OnInit, OnDestroy, OnChanges {
    @Input() data: BoardField;
    @Input() mapLocation: MapLocation;
    private elem: any;

    constructor(private rs: RenderingService, private scr: SceneRenderService) {
    }

    // caused by simultataneous getFields() / getLocations() - this one should be handled by a preload guard in the future
    // could be a "LoadGameResources" service: can be reused @ game run stage;
    async ngOnInit() {
        // try {
        //     const id = this.mapLocation ? this.mapLocation.id : null;
        //     const data: FabricObjectData = {
        //         field: this.data.id,
        //         game: this.data.game,
        //         paths: new Set(),
        //         id
        //     };
        //     const initialSettings = this.mapLocation || DEFAULT_MAP_LOCATION;
        //     this.elem = await this.rs.createNode(this.data.image, initialSettings, data);
        //     this.rs.addObject(this.elem);
        // } catch (err) {
        //     console.log(err);
        // }

        const id = this.mapLocation ? this.mapLocation.id : null;
        if (id) {
            const data: FabricObjectData = {
                field: this.data.id,
                game: this.data.game,
                paths: new Set(),
                id
            };
            const initialSettings = this.mapLocation || DEFAULT_MAP_LOCATION;
            this.scr.saveElement(this.data.image, initialSettings, data.id);
        }
    }

    ngOnDestroy() {
        //this.rs.removeObject(this.elem);
        this.scr.removeElement(this.mapLocation.id);
    }

    ngOnChanges(c: SimpleChanges) {
        const loc = c.mapLocation;
        if (this.elem && loc && loc.currentValue && loc.currentValue !== loc.previousValue) {
            const locValue: MapLocation = loc.currentValue;
            // const data = {...loc.currentValue, data: {
            //     ...this.elem.data,
            //     id: loc.currentValue.id
            // }};
            //this.rs.updateObject(this.elem, data);
        }

        if (loc && loc.currentValue && loc.currentValue !== loc.previousValue) {
            const locValue: MapLocation = loc.currentValue;
            this.scr.saveElement(this.data.image, locValue, locValue.id);
        }
    }
}
