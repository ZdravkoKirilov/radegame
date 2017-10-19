import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators as vd} from '@angular/forms';

import {GameMetadata} from '../../../game-mechanics/models/index';

@Component({
    selector: 'rg-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSettingsComponent implements OnInit {
    @Output() change: EventEmitter<GameMetadata> = new EventEmitter<GameMetadata>();

    public rForm: FormGroup;
    @Input() public allowedMovements: string[];

    constructor(private fb: FormBuilder) {
        this.rForm = fb.group({
            'movements': [null, vd.required],
            'image': [null, vd.required],
            'boardWidth': [null],
            'boardHeight': [null]
        });
    }

    handleSliderChange(data: GameMetadata): void {
        this.rForm.patchValue(data);
    }

    handleFile(file): void {
        this.rForm.patchValue({image: file});
    }

    isValid(name): boolean {
        return this.rForm.get(name).valid;
    }

    ngOnInit() {
        this.rForm.valueChanges.subscribe((data: GameMetadata) => this.change.emit(data));
    }
}
