import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, Validators as vd, FormBuilder} from '@angular/forms';

import {Character, Ability} from '../../../game-mechanics/models/index';

@Component({
    selector: 'rg-character-editor',
    templateUrl: './character-editor.component.html',
    styleUrls: ['./character-editor.component.scss']
})
export class CharacterEditorComponent {
    @Output() save: EventEmitter<Character> = new EventEmitter<Character>();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() abilities: Ability[];
    public rForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.rForm = fb.group({
            'name': [null, vd.compose([vd.required, vd.minLength(3)])],
            'image': [null],
            'abilities': [null],
            'description': [null]
        });
    }

    isValid(name): boolean {
        return this.rForm.get(name).valid;
    }

    saveGameCharacter(): void {
        this.save.emit(this.rForm.value);
    }

    cancelAction(): void {
        this.cancel.emit();
    }

    handleAbilitiesChange({value}): void {
        const currentValue = this.rForm.get('abilities').value;
        const currentSet = currentValue ? new Set([...currentValue]) : new Set();
        currentSet.has(value) ? currentSet.delete(value) : currentSet.add(value);
        this.rForm.patchValue({abilities: Array.from(currentSet)});
    }

    handleFileUpload(file): void {
        this.rForm.patchValue({image: file});
    }
}
