import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { SmartBase } from '../../mixins';
import { composeFieldForm } from '../../forms';
import { formKeys } from '../../state';

@Component({
  selector: 'rg-fields-container',
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
export class FieldsContainerComponent extends SmartBase {

  formDefinition = composeFieldForm;
  readonly key = formKeys.FIELDS;

  constructor(public store: Store<AppState>) { super(store) }

}
