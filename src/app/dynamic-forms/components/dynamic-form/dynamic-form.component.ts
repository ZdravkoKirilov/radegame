import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../models/Base';
import {ControlsService} from '../../services/controls.service';

@Component({
    selector: 'rg-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Input() controls: BaseControl<any>[] = [];
    form: FormGroup;

    constructor(private cs: ControlsService) {
    }

    ngOnInit() {
        this.form = this.cs.toFormGroup(this.controls);
        this.form.valueChanges.subscribe(data => this.change.emit(data));
    }

}
