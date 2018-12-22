import {
  Component, OnInit,
  Input, Output, EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDefinition, BaseControl, ControlsService, ConnectedEntities } from '@app/dynamic-forms';
import { GameEntity } from '@app/game-mechanics';

@Component({
  selector: 'rg-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss'],
})
export class EntityEditorComponent implements OnInit {

  @Output() save: EventEmitter<GameEntity> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  @Input() formDefinition: FormDefinition;
  @Input() selectedItem: GameEntity;
  @Input() connectedEntities: ConnectedEntities;

  public form: FormGroup;
  public controls: BaseControl[];

  constructor(private cs: ControlsService) {
  }

  ngOnInit() {
    if (this.formDefinition) {
      this.controls = this.formDefinition(this.selectedItem, this.connectedEntities);
      this.form = this.cs.toFormGroup(this.controls);
    }
  }

  saveItem() {
    this.save.emit(<GameEntity>this.form.value);
  }

  cancelAction() {
    this.cancel.emit();
  }
}
