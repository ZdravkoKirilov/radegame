import { Component } from '@angular/core';
import { composeAnimationForm } from '../../forms';

import { SmartBase } from '../../mixins';
import { ALL_ENTITIES} from '@app/game-mechanics';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';

@Component({
  selector: 'rg-animations-container',
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
export class AnimationsContainerComponent extends SmartBase {

  formDefinition = composeAnimationForm;
  readonly key = ALL_ENTITIES.animations ;

  constructor(public store: Store<AppState>) { super(store) }

}
