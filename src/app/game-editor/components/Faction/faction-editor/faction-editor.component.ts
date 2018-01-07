import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Faction, Resource } from '../../../../game-mechanics/models/index';
import { BaseControl } from '../../../../dynamic-forms/models/Base.model';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';

@Component({
    selector: 'rg-faction-editor',
    templateUrl: './faction-editor.component.html',
    styleUrls: ['./faction-editor.component.scss']
})
export class FactionEditorComponent implements OnInit {
    @Output() save: EventEmitter<Faction> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    @Input() formDefinition: FormDefinition;
    @Input() resources: Resource[];
    @Input() selectedItem: Faction;

    public form: FormGroup;
    public controls: BaseControl[];

    constructor(private cs: ControlsService) {
    }

    saveItem() {
        this.save.emit(this.form.value);
    }

    cancelAction() {
        this.cancel.emit();
    }

    ngOnInit() {
        this.controls = this.formDefinition(this.resources, this.selectedItem);
        this.form = this.cs.toFormGroup(this.controls);
    }
}
