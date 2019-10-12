import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { SmartBase } from '../../mixins';
import { ALL_ENTITIES } from '@app/game-mechanics';
import { composeTextForm } from '../../forms';

@Component({
  selector: 'rg-texts-container',
  template: `
  <rg-editor-layout>
  <rg-entity-view
      [formDefinition]="formDefinition"
      [items]="items$ | async"
      [showEditor]="showEditor$ | async"
      [selectedItem]="selectedItem$ | async"
      [connectedEntities]="connectedEntities$ | async"
      (toggleEditor)="toggleEditor($event)"
      (saveItem)="saveItem($event)"
      (editItem)="editItem($event)"
      (removeItem)="removeItem($event)">
  </rg-entity-view>
</rg-editor-layout>
  `,
  styles: []
})
export class TextsContainerComponent extends SmartBase {

  formDefinition = composeTextForm;
  readonly key = ALL_ENTITIES.texts;

  constructor(public store: Store<AppState>) { super(store) }

}
