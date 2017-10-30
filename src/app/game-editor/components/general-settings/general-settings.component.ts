import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {GameMetadata} from '../../../game-mechanics/models/index';
import {ControlsService} from '../../../dynamic-forms/services/controls.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'rg-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSettingsComponent implements OnInit {
    @Output() change: EventEmitter<GameMetadata> = new EventEmitter<GameMetadata>();
    @Input() formDefinition: any[];
    public form: FormGroup;

    constructor(private cs: ControlsService) {
    }

    ngOnInit() {
        this.form = this.cs.toFormGroup(this.formDefinition);
        this.form.valueChanges.subscribe((data: GameMetadata) => {
            this.change.emit(data);
        });
    }
}
