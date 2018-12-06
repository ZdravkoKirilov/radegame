import { Component, Input, Output, EventEmitter } from '@angular/core';
import { composeSlotForm, composePathForm } from '../../forms';
import { ConnectedEntities } from '@app/dynamic-forms';
import { Slot, PathEntity, Stage } from '@app/game-mechanics';

@Component({
  selector: 'rg-board-editor',
  template: `
    <div>

      <rg-board-toolbar
        [class.hidden]="visibleEditor"
        [selectedSlot]="!!selectedSlot"
        [selectedPath]="!!selectedPath"
        (showSlotEditor)="toggleSlotEditor(true)"
        (showPathEditor)="togglePathEditor(true)"
      ></rg-board-toolbar>

      <rg-entity-editor 
        *ngIf="showSlotEditor" 
        [formDefinition]="slotForm"
        [selectedItem]="selectedSlot"
        [connectedEntities]="entities"
        (cancel)="toggleSlotEditor(false)"
        (save)="handleSaveSlot($event)"
      ></rg-entity-editor>

      <rg-entity-editor 
        *ngIf="showPathEditor" 
        [formDefinition]="pathForm"
        [selectedItem]="selectedPath"
        [connectedEntities]="entities"
        (cancel)="togglePathEditor(false)"
      ></rg-entity-editor>

      <rg-board-main 
        [stage]="stage"
        [slots]="slots"
        [selectedSlot]="selectedSlot"
        [paths]="paths"
        [selectedPath]="selectedPath"
      ></rg-board-main>

    </div>
  `,
  styles: []
})
export class BoardEditorComponent {

  @Input() entities: ConnectedEntities = { fields: [] };
  @Input() slots: Slot[];
  @Input() paths: PathEntity[];
  @Input() stage: Stage;
  @Input() gameId: number;

  @Output() saveSlot = new EventEmitter<Slot>();

  showSlotEditor = false;
  showPathEditor = false;
  pathMode = false;

  slotForm = composeSlotForm;
  pathForm = composePathForm;

  selectedSlot: Slot;
  selectedPath: PathEntity;

  get visibleEditor() {
    return this.showSlotEditor || this.showPathEditor;
  }

  toggleSlotEditor(isVisible: boolean) {
    this.showSlotEditor = isVisible;
  }

  togglePathEditor(isVisible: boolean) {
    this.showPathEditor = isVisible;
  }

  handleSaveSlot(payload: Slot) {
    const slot = <Slot>{ ...payload, game: this.gameId, owner: this.stage.id };
    if (this.selectedSlot) {
      slot.id = this.selectedSlot.id;
    }
    this.showSlotEditor = false;
    this.saveSlot.emit(slot);
  }

}
