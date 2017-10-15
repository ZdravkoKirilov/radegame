import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { GameBoard } from '../../../game-mechanics/models/GameBoard';
import { GameMetadata } from './../../../game-mechanics/models/GameMetadata';

@Component({
    selector: 'rg-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSettingsComponent {
    @Input('form') form: FormGroup;
    @Input('movements') movements: string[];
    @Input('boards') boardTypes: GameBoard[];
    @Output('gotImage') gotImage: EventEmitter<GameMetadata> = new EventEmitter<GameMetadata>();
    @Output('sliderChange') sliderChange: EventEmitter<GameMetadata> = new EventEmitter<GameMetadata>();

    constructor() {
    }
    handleSliderChange(data: GameMetadata): void {
        this.sliderChange.emit(data);
    }
    handleFile(file): void {
        this.gotImage.emit({image: file});
    }
    isValid(name): boolean {
        return this.form.get(name).valid;
    }
}
