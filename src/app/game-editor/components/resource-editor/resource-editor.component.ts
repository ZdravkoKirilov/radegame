import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators as vd } from '@angular/forms';

import { Resource } from '../../../game-mechanics/models/Resource';

@Component({
    selector: 'rg-resource-editor',
    templateUrl: './resource-editor.component.html',
    styleUrls: ['./resource-editor.component.scss']
})
export class ResourceEditorComponent {
    @Output() save: EventEmitter<Resource> = new EventEmitter<Resource>();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    public rForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.rForm = fb.group({
            'name': [null, vd.compose([vd.required, vd.minLength(3)])],
            'description': [null],
            'plural': [null],
            'image': [null, vd.required]
        });
    }

    isValid(name) {
        return this.rForm.get(name).valid;
    }

    saveGameResource() {
        this.save.emit(this.rForm.value);
    }

    cancelAction() {
        this.cancel.emit();
    }

    handleFileUpload(file): void {
        this.rForm.patchValue({ image: file });
    }
}
