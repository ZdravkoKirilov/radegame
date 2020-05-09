import {
  Component, Input, TemplateRef,
  EventEmitter, Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { GameEntity, ExpressionContext } from '@app/game-mechanics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { WithTimeout } from '@app/shared';

@Component({
  selector: 'rg-shape-editor',
  templateUrl: './shape-editor.component.html',
  styleUrls: ['./shape-editor.component.scss']
})
export class ShapeEditorComponent {

  @Input() template: TemplateRef<any>;

  @Input() showEditor: boolean = false;
  @Input() selectedItem: GameEntity;
  @Input() items: GameEntity[];
  @Input() formDefinition: FormDefinition;
  @Input() connectedEntities: ConnectedEntities;
  @Input() expressionContext: ExpressionContext;

  @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
  @Output() editItem: EventEmitter<GameEntity> = new EventEmitter();
  @Output() saveItem: EventEmitter<GameEntity> = new EventEmitter();
  @Output() removeItem: EventEmitter<GameEntity> = new EventEmitter();

  draft: GameEntity;
  form: FormGroup;

  get saveEnabled() {
    return this.form ? Boolean(this.form.valid) : false;
  }

  handleSave() {
    this.saveItem.emit(this.draft);
  }

  @WithTimeout()
  handleDraftUpdate(form: FormGroup) {
    this.form = form;
    this.draft = { ...form.value };
  }

  showItemEditor() {
    this.toggleEditor.emit(true);
  }

  hideItemEditor() {
    this.toggleEditor.emit(false);
  }

}
