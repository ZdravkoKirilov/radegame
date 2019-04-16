import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { SmartBase } from '../../mixins';
import { composeSoundForm } from '../../forms';
import { formKeys, FormKey } from '../../state';

@Component({
  selector: 'rg-sounds-container',
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
export class SoundsContainerComponent extends SmartBase {

  formDefinition = composeSoundForm;
  readonly key = formKeys.sounds as FormKey;

  constructor(public store: Store<AppState>) { super(store) }

}
