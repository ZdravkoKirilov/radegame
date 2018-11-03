import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from 'app/game-editor/mixins';
import { AppState } from '@app/core';
import { composeTeamForm } from '../../forms';
import { formKeys } from '../../state';

@Component({
  selector: 'rg-teams-container',
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
export class TeamsContainerComponent extends SmartBase {

  formDefinition = composeTeamForm;
  readonly key = formKeys.TEAMS;

  constructor(public store: Store<AppState>) { super(store) }


}
