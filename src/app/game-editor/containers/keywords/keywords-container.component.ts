import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from '../../mixins';
import { ALL_ENTITIES} from '@app/game-mechanics';
import { AppState } from '@app/core';

import { composeKeywordForm } from '../../forms';

@Component({
  selector: 'rg-keywords-container',
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
export class KeywordsContainerComponent extends SmartBase {

  formDefinition = composeKeywordForm;
  readonly key = ALL_ENTITIES.keywords ;

  constructor(public store: Store<AppState>) { super(store) }

}
