import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';

import { SceneRenderService, MapLocation, MapPath } from '../../../../../game-mechanics';
import { propHasNewValue } from '../../../../../shared';

@Component({
    selector: 'rg-map-path',
    templateUrl: './map-path.component.html',
    styleUrls: ['./map-path.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPathComponent implements OnInit, OnDestroy, OnChanges {
    @Input() data: MapPath;
    @Input() mapLocations: { [key: string]: MapLocation };
    @Input() selected = false;

    constructor(private scr: SceneRenderService) {
    }

    async ngOnInit() {
        this.scr.savePath(this.data, this.data.id);
    }

    ngOnDestroy() {
        this.scr.removePath(this.data.id);
    }

    ngOnChanges(c: SimpleChanges) {
        if (propHasNewValue(c, 'selected')) {
            this.scr.changeSelectedPath(this.data.id, c.selected.currentValue);
        }
    }
}
