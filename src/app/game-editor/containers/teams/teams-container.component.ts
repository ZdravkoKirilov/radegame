import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from 'app/game-editor/mixins';
import { AppState } from '@app/core';
import { composeTeamForm } from '../../forms';
import { formKeys, FormKey } from '../../state';

@Component({
  selector: 'rg-teams-container',
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
export class TeamsContainerComponent extends SmartBase {

  formDefinition = composeTeamForm;
  readonly key = formKeys.teams ;

  constructor(public store: Store<AppState>) { super(store) }


}
