import { Component, Input, Output, EventEmitter } from '@angular/core';
import { composeLocationForm } from '../../forms';
import { ConnectedEntities } from '@app/dynamic-forms';
import { LocationEntity, PathEntity, Stage } from '@app/game-mechanics';

@Component({
  selector: 'rg-board-editor',
  template: `
    <div>

      <rg-board-toolbar 
        [class.hidden]="showEditor"
        [selectedLocation]="!!selectedLocation"
        [selectedPath]="!!selectedPath"
        (showEditor)="showEditor = true"
      ></rg-board-toolbar>

      <rg-board-main 
        [class.hidden]="showEditor"
        [stage]="stage"
        [locations]="locations"
        [selectedLocation]="selectedLocation"
        [paths]="paths"
        [selectedPath]="selectedPath"
      ></rg-board-main>

      <rg-entity-editor 
        *ngIf="showEditor" 
        [formDefinition]="formDefinition"
        [selectedItem]="selectedLocation"
        [connectedEntities]="entities"
        (cancel)="showEditor = false"
      ></rg-entity-editor>

    </div>
  `,
  styles: []
})
export class BoardEditorComponent {

  @Input() entities: ConnectedEntities = { fields: [], stacks: [] };
  @Input() locations: LocationEntity[];
  @Input() paths: PathEntity[];
  @Input() stage: Stage;

  showEditor = false;
  pathMode = false;

  formDefinition = composeLocationForm;

  selectedLocation: LocationEntity;
  selectedPath: PathEntity;

}
