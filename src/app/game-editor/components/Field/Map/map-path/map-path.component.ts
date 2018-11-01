import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';

import { SceneRenderService, LocationEntity, PathEntity } from '@app/game-mechanics';

@Component({
    selector: 'rg-map-path',
    templateUrl: './map-path.component.html',
    styleUrls: ['./map-path.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPathComponent implements OnInit, OnDestroy {
    @Input() data: PathEntity;
    @Input() mapLocations: { [key: string]: LocationEntity };
    @Input() selected = false;

    constructor(private scr: SceneRenderService) {
    }

    async ngOnInit() {
        this.scr.savePath(this.data, this.data.id);
    }

    ngOnDestroy() {
        this.scr.removePath(this.data.id);
    }
}
