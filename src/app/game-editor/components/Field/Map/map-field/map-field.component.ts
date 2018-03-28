import { Component, OnInit, OnDestroy, OnChanges, Input, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

import { Field, MapLocation, SceneRenderService } from '../../../../../game-mechanics';
import { DEFAULT_MAP_LOCATION } from '../../../../utils';
import { propHasNewValue, propHasChanged, getPropValue } from '../../../../../shared';

@Component({
    selector: 'rg-map-field',
    templateUrl: './map-field.component.html',
    styleUrls: ['./map-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapFieldComponent implements OnInit, OnDestroy, OnChanges {
    @Input() data: Field;
    @Input() mapLocation: MapLocation;
    @Input() selected = false;

    constructor(private scr: SceneRenderService) {
    }

    ngOnInit() {
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
        if (propHasNewValue(c, 'mapLocation')) {
            const locValue: MapLocation = c.mapLocation.currentValue;
            this.scr.saveElement(this.data.image, locValue, locValue.id);
        }
    }
}
