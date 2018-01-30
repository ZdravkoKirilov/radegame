import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { BaseControl } from '../../../../dynamic-forms/models/Base.model';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { Round } from '../../../../game-mechanics/models/index';
import { ConnectedEntities } from '../../../../dynamic-forms/models/ConnectedEntities';

@Component({
  selector: 'rg-round-editor',
  templateUrl: './round-editor.component.html',
  styleUrls: ['./round-editor.component.scss']
})
export class RoundEditorComponent implements OnInit {

    @Output() save: EventEmitter<Round> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    @Input() formDefinition: FormDefinition;
    @Input() selectedItem: Round;
    @Input() connectedEntities: ConnectedEntities;

    public form: FormGroup;
    public controls: BaseControl[];

    constructor(private cs: ControlsService) {
    }

    ngOnInit() {
        this.controls = this.formDefinition(this.selectedItem, this.connectedEntities);
        this.form = this.cs.toFormGroup(this.controls);
    }

    saveItem() {
        this.save.emit(this.form.value);
    }

    cancelAction() {
        this.cancel.emit();
    }

}
