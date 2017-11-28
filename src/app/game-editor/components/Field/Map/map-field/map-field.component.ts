import { Component, OnInit, OnDestroy, OnChanges, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

import { BoardField, MapLocation } from '../../../../../game-mechanics/models/index';
import { SceneRenderService } from '../../../../../game-mechanics/rendering/scene-render.service';
import { DEFAULT_MAP_LOCATION } from '../../../../utils/config';

@Component({
    selector: 'rg-map-field',
    templateUrl: './map-field.component.html',
    styleUrls: ['./map-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapFieldComponent implements OnInit, OnDestroy, OnChanges {
    @Input() data: BoardField;
    @Input() mapLocation: MapLocation;

    constructor(private scr: SceneRenderService) {
    }

    async ngOnInit() {
        const id = this.mapLocation ? this.mapLocation.id : null;
        if (id) {
            const data = {
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
        this.scr.removeElement(this.mapLocation.id);
    }

    ngOnChanges(c: SimpleChanges) {
        const loc = c.mapLocation;
        if (loc && loc.currentValue && loc.currentValue !== loc.previousValue) {
            const locValue: MapLocation = loc.currentValue;
            this.scr.saveElement(this.data.image, locValue, locValue.id);
        }
    }
}
