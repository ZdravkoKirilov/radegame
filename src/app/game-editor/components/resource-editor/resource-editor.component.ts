import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators as vd } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state-store/index';

import { SaveResourceAction } from '../../state/actions/actions';
import { Resource } from '../../../game-mechanics/models/Resource';

@Component({
    selector: 'rg-resource-editor',
    templateUrl: './resource-editor.component.html',
    styleUrls: ['./resource-editor.component.scss']
})
export class ResourceEditorComponent {
    public rForm: FormGroup;
    constructor(private fb: FormBuilder, private store: Store<AppState>) {
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
        this.store.dispatch(new SaveResourceAction(this.rForm.value));
    }
    handleFileUpload(file): void {
        this.rForm.patchValue({ image: file });
    }
}
