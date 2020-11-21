import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { get } from 'lodash';

import { BaseControl } from '../../models';
import { ControlsService } from '../../services';
import { controlTypes } from '../../config';

@Component({
    selector: 'rg-form-array',
    templateUrl: './form-array.component.html',
    styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() group: FormGroup;
    @Input() data: BaseControl;
    formArray: FormArray;
    controls: BaseControl[];
    controlTypes = controlTypes;

    constructor(private cs: ControlsService) {
    }

    addChild() {
        this.formArray.push(this.cs.toFormGroup(get(this.data, 'childTemplate.children')));
        this.controls.push({ ...this.data.childTemplate });
    }

    removeChild(index: number) {
        this.controls.splice(index, 1);
        this.formArray.removeAt(index);
    }

    valueChange({ index, data }: { index: number, data: unknown}) {
        this.formArray.controls[index].patchValue(data);
    }

    ngOnInit() {
        this.controls = [...this.data.children!];
        const name = get(this.data, 'name')!;
        this.formArray = <FormArray>this.form.controls[name] || <FormArray>this.group.controls[name];
    }
}
