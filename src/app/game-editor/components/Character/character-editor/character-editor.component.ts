import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {Character, Ability} from '../../../../game-mechanics/models/index';
import {BaseControl} from '../../../../dynamic-forms/models/Base';
import {ControlsService} from '../../../../dynamic-forms/services/controls.service';

@Component({
    selector: 'rg-character-editor',
    templateUrl: './character-editor.component.html',
    styleUrls: ['./character-editor.component.scss']
})
export class CharacterEditorComponent implements OnInit {
    @Output() save: EventEmitter<Character> = new EventEmitter<Character>();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() abilities: Ability[];
    @Input() formDefinition: BaseControl<any>[];
    public rForm: FormGroup;

    constructor(private cs: ControlsService) {
    }

    saveGameCharacter(): void {
        this.save.emit(this.rForm.value);
    }

    cancelAction(): void {
        this.cancel.emit();
    }

    ngOnInit() {
        this.rForm = this.cs.toFormGroup(this.formDefinition);
    }
}
