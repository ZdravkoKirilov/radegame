import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { ALL_ENTITIES } from '@app/game-mechanics';

import { SmartBase } from '../../mixins';
import { composeTextForm } from '../../forms';
import { selectExpressionContext } from '../../state';

@Component({
  selector: 'rg-texts-container',
  template: `
  <rg-text-editor 
    [expressionContext]="expressionContext$ | async" 
    [formDefinition]="formDefinition" 
    [items]="items$ | async"
    [showEditor]="showEditor$ | async"
    [selectedItem]="selectedItem$ | async"
    [connectedEntities]="connectedEntities$ | async" 
    (toggleEditor)="toggleEditor($event)"
    (saveItem)="saveItem($event)" 
    (editItem)="editItem($event)" 
    (removeItem)="removeItem($event)">
  </rg-text-editor>
  `,
  styles: []
})
export class TextsContainerComponent extends SmartBase {

  formDefinition = composeTextForm;
  readonly key = ALL_ENTITIES.texts;

  constructor(public store: Store<AppState>) { super(store) }

  expressionContext$ = this.store.pipe(
    map(state => {
      const context = selectExpressionContext(state);
      return context;
    })
  );

}
