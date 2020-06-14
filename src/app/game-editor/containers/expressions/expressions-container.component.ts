import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SmartBase } from '../../mixins';
import { ALL_ENTITIES } from '@app/game-mechanics';
import { AppState } from '@app/core';

import { composeExpressionForm } from '../../forms';

@Component({
  selector: 'rg-expressions-container',
  template: `
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
  `,
  styles: []
})
export class ExpressionsContainerComponent extends SmartBase {

  formDefinition = composeExpressionForm;
  readonly key = ALL_ENTITIES.expressions;

  constructor(public store: Store<AppState>) { super(store) }

}
