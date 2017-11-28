import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {Faction, GameAction} from '../../../../game-mechanics/models/index';
import {BaseControl} from '../../../../dynamic-forms/models/Base';
import {ControlsService} from '../../../../dynamic-forms/services/controls.service';

@Component({
    selector: 'rg-faction-editor',
    templateUrl: './faction-editor.component.html',
    styleUrls: ['./faction-editor.component.scss']
})
export class FactionEditorComponent implements OnInit {
    @Output() save: EventEmitter<Faction> = new EventEmitter<Faction>();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
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
