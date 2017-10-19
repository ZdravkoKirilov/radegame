import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, Validators as vd, FormBuilder} from '@angular/forms';

import {Character} from '../../../game-mechanics/models/index';

@Component({
    selector: 'rg-character-editor',
    templateUrl: './character-editor.component.html',
    styleUrls: ['./character-editor.component.scss']
})
export class CharacterEditorComponent {
    @Output() save: EventEmitter<Character> = new EventEmitter<Character>();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() supportedAbilities: string[];
    public rForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.rForm = fb.group({
            'name': [null, vd.compose([vd.required, vd.minLength(3)])],
            'image': [null, vd.required]
        });
    }

    isValid(name) {
        return this.rForm.get(name).valid;
    }

    saveGameCharacter() {
        this.save.emit(this.rForm.value);
    }

    cancelAction() {
        this.cancel.emit();
    }

    handleFileUpload(file): void {
        this.rForm.patchValue({image: file});
    }
}
