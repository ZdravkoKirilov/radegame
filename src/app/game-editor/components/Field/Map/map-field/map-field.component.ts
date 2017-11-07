import {Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy} from '@angular/core';

import {BoardField, MapFieldSettings} from '../../../../../game-mechanics/models/index';
import {RenderingService} from '../../../../../game-mechanics/services/rendering.service';
import {FabricObject} from '../../../../../shared/models/FabricObject';

@Component({
    selector: 'rg-map-field',
    templateUrl: './map-field.component.html',
    styleUrls: ['./map-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapFieldComponent implements OnInit, OnDestroy {
    @Input() data: BoardField;
    @Input() mapFieldSettings: MapFieldSettings;
    private elem: any;

    constructor(private rs: RenderingService) {
    }

    async ngOnInit() {
        const options = this.mapFieldSettings;
        const initialSettings = options || {
            width: 100,
            height: 100
        };
        try {
            const obj: FabricObject = await this.rs.createImage(this.data.image, initialSettings);
            obj.itemId = this.data.id;
            this.elem = obj;
            this.rs.addObject(this.elem);
        } catch (err) {
            console.log(err);
        }
    }

    ngOnDestroy() {
        this.rs.removeObject(this.elem);
    }
}
