import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES } from '@app/game-mechanics';
import { composeSoundForm } from '../../forms';


@Component({
  selector: 'rg-sounds-container',
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
export class SoundsContainerComponent extends SmartBase {

  formDefinition = composeSoundForm;
  readonly key = ALL_ENTITIES.sounds;

  constructor(public store: Store<AppState>) { super(store) }

}
