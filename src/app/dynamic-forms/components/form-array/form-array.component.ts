import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { BaseControl, FormDefinition } from '../../models';
import { ControlsService } from '../../services';
import { controlTypes } from '../../config';

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
    controlTypes = controlTypes;

    constructor(private cs: ControlsService) {
    }

    addChild() {
        this.formArray.push(this.cs.toFormGroup(this.data.childTemplate.childControls));
        this.controls.push({ ...this.data.childTemplate });
    }

    removeChild(index) {
        this.controls.splice(index, 1);
        this.formArray.removeAt(index);
    }

    valueChange({ index, data }) {
        this.formArray.controls[index].patchValue(data);
    }

    ngOnInit() {
        this.controls = [...this.data.childControls];
        this.formArray = <FormArray>this.form.controls[this.data.name];
    }
}
