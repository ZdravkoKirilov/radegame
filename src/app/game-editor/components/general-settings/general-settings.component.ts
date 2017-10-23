import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import {GameMetadata} from '../../../game-mechanics/models/index';

@Component({
    selector: 'rg-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSettingsComponent {
    @Output() change: EventEmitter<GameMetadata> = new EventEmitter<GameMetadata>();
    @Input() formDefinition: any[];

    constructor() {
    }

    handleChange(data: GameMetadata) {
        this.change.emit(data);
    }
}
