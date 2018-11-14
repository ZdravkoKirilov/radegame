import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { SmartBase } from '../../mixins';
import { composeSourceForm } from '../../forms';
import { formKeys } from '../../state';

@Component({
  selector: 'rg-sources-container',
  template: `
  <rg-entity-view
    [items]="items$ | async"
    [showEditor]="showEditor"
    [selectedItem]="selectedItem"
    [connectedEntities]="connectedEntities$ | async"
    [formDefinition]="formDefinition"
    (toggleEditor)="toggleEditor($event)"
    (editItem)="editItem($event)"
    (saveItem)="saveItem($event)"
    (removeItem)="removeItem($event)"
  ></rg-entity-view>
  `,
  styles: []
})
export class SourcesContainerComponent extends SmartBase {

  formDefinition = composeSourceForm;
  readonly key = formKeys.SOURCES;

  constructor(public store: Store<AppState>) { super(store) }

}
