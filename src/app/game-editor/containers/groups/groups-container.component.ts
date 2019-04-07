import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from '../../mixins';
import { AppState } from '@app/core';
import { formKeys } from '../../state';
import { composeKeywordForm } from 'app/game-editor/forms';
import { composeGroupForm } from 'app/game-editor/forms/group';

@Component({
  selector: 'rg-groups-container',
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
export class GroupsContainerComponent extends SmartBase {

  formDefinition = composeGroupForm;
  readonly key = formKeys.GROUPS;

  constructor(public store: Store<AppState>) { super(store) }


}
