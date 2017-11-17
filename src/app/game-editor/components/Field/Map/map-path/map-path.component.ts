import {Component, OnInit, OnChanges, OnDestroy, Input, ChangeDetectionStrategy, SimpleChanges} from '@angular/core';

import {RenderingService} from '../../../../../game-mechanics/services/rendering.service';
import {MapLocation, MapPath} from '../../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-map-path',
    templateUrl: './map-path.component.html',
    styleUrls: ['./map-path.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPathComponent implements OnInit, OnChanges, OnDestroy {
    @Input() data: MapPath;
    @Input() mapLocations: { [key: string]: MapLocation };
    private elem: any;

    constructor(private rs: RenderingService) {
    }

    async ngOnInit() {
        // try {
        //     const from = Object.values(this.mapLocations).find(elem => elem.id === this.data.fromLoc);
        //     const to = Object.values(this.mapLocations).find(elem => elem.id === this.data.toLoc);
        //     const data = {
        //         from: from.id,
        //         to: to.id,
        //         id: this.data.id
        //     };
        //     this.elem = await this.rs.createPath(null, data);
        //     const coords = this.rs.calculatePathCoords(from, to);
        //     this.rs.updateObject(this.elem, {
        //         id: this.data.id,
        //         ...coords
        //     });
        //     this.rs.addObject(this.elem);
        // } catch (err) {
        //     console.log(err);
        // }
    }

    ngOnDestroy() {
        // this.rs.removeObject(this.elem);
    }

    ngOnChanges(c: SimpleChanges) {
        if (c.mapLocations && c.mapLocations.currentValue && this.elem) {
            const from = Object.values(this.mapLocations).find(elem => elem.id === this.data.fromLoc);
            const to = Object.values(this.mapLocations).find(elem => elem.id === this.data.toLoc);
            // const coords = this.rs.calculatePathCoords(from, to);
            // this.rs.updateObject(this.elem, coords);
        }
    }
}
