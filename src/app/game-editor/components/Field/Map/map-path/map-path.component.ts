import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';

import { SceneRenderService } from '../../../../../game-mechanics/rendering/scene-render.service';
import { MapLocation, MapPath } from '../../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-map-path',
    templateUrl: './map-path.component.html',
    styleUrls: ['./map-path.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPathComponent implements OnInit, OnDestroy {
    @Input() data: MapPath;
    @Input() mapLocations: { [key: string]: MapLocation };

    constructor(private scr: SceneRenderService) {
    }

    async ngOnInit() {
        this.scr.savePath(this.data, this.data.id);
    }

    ngOnDestroy() {
        this.scr.removePath(this.data.id);
    }
}
