import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { BaseControl } from '../../../../dynamic-forms/models/Base.model';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { Quest } from '../../../../game-mechanics/models/index';
import { ConnectedEntities } from '../../../../dynamic-forms/models/ConnectedEntities';

@Component({
    selector: 'rg-quest-editor',
    templateUrl: './quest-editor.component.html',
    styleUrls: ['./quest-editor.component.scss']
})
export class QuestEditorComponent implements OnInit {

    @Output() save: EventEmitter<Quest> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    @Input() formDefinition: FormDefinition;
    @Input() selectedItem: Quest;
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
