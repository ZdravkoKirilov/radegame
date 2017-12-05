import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { BaseControl } from '../../models/Base';
import { ControlsService } from '../../services/controls.service';

@Component({
    selector: 'rg-form-array',
    templateUrl: './form-array.component.html',
    styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() data: BaseControl;
    formArray: FormArray;
    controls: BaseControl[];

    constructor(private cs: ControlsService) {
    }

    addChild() {
        this.formArray.push(this.cs.toFormGroup(this.data.childTemplate.childControls));
        this.controls.push(this.data.childTemplate);
    }

    removeChild(index) {
        this.controls.splice(index, 1);
        this.formArray.removeAt(index);
    }

    valueChange(data) {
        this.formArray.controls[data.index].patchValue(data.data);
    }

    ngOnInit() {
        this.controls = [...this.data.childControls];
        this.formArray = <FormArray>this.form.controls[this.data.name];
    }
}
