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
        [selectedLocation]="!!selectedLocation"
        [selectedPath]="!!selectedPath"
        (showLocationEditor)="showLocationEditor = true"
        (showPathEditor)="showPathEditor = true"
      ></rg-board-toolbar>

      <rg-board-main 
        [class.hidden]="visibleEditor"
        [stage]="stage"
        [locations]="locations"
        [selectedLocation]="selectedLocation"
        [paths]="paths"
        [selectedPath]="selectedPath"
      ></rg-board-main>

      <rg-entity-editor 
        *ngIf="showLocationEditor" 
        [formDefinition]="locationForm"
        [selectedItem]="selectedLocation"
        [connectedEntities]="entities"
        (cancel)="showLocationEditor = false"
        (save)="handleSaveSlot($event)"
      ></rg-entity-editor>

      <rg-entity-editor 
        *ngIf="showPathEditor" 
        [formDefinition]="pathForm"
        [selectedItem]="selectedPath"
        [connectedEntities]="entities"
        (cancel)="showPathEditor = false"
      ></rg-entity-editor>

    </div>
  `,
  styles: []
})
export class BoardEditorComponent {

  @Input() entities: ConnectedEntities = { fields: [] };
  @Input() locations: Slot[];
  @Input() paths: PathEntity[];
  @Input() stage: Stage;
  @Input() gameId: number;

  @Output() saveSlot = new EventEmitter<Slot>();

  get visibleEditor() {
    return this.showLocationEditor || this.showPathEditor;
  }

  handleSaveSlot(payload: Slot) {
    const slot = <Slot>{ ...payload, game: this.gameId, owner: this.stage.id };
    if (this.selectedLocation) {
      slot.id = this.selectedLocation.id;
    }
    this.saveSlot.emit(slot);
    this.showLocationEditor = false;
  }

  showLocationEditor = false;
  showPathEditor = false;
  pathMode = false;

  locationForm = composeSlotForm;
  pathForm = composePathForm;

  selectedLocation: Slot;
  selectedPath: PathEntity;

}
