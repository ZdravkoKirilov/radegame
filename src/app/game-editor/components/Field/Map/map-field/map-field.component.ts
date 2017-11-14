import {Component, OnInit, OnDestroy, OnChanges, Input, ChangeDetectionStrategy, SimpleChanges} from '@angular/core';

import {BoardField, MapLocation} from '../../../../../game-mechanics/models/index';
import {RenderingService} from '../../../../../game-mechanics/services/rendering.service';
import {FabricObject} from '../../../../../shared/models/FabricObject';

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

    constructor(private rs: RenderingService) {
    }

    // caused by simultataneous getFields() / getLocations() - this one should be handled by a preload guard in the future
    // could be a "LoadGameResources" service: can be reused @ game run stage;
    async ngOnInit() {
        try {
            const obj: FabricObject = await this.rs.createImage(this.data.image);
            const initialSettings = this.mapLocation || {width: 100, height: 100, top: 10, left: 10};
            obj.field = this.data.id;
            obj.game = this.data.game;
            obj.id = this.mapLocation ? this.mapLocation.id : null;
            this.elem = obj;
            this.rs.updateObject(this.elem, initialSettings);
            this.rs.addObject(this.elem);
        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.rs.removeObject(this.elem);
    }

    ngOnChanges(c: SimpleChanges) {
        const loc = c.mapLocation;
        if (this.elem && loc && loc.currentValue && loc.currentValue !== loc.previousValue) {
            this.rs.updateObject(this.elem, loc.currentValue);
        }
    }
}
