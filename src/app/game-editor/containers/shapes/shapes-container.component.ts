import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { SmartBase } from '../../mixins';
import { ALL_ENTITIES } from '@app/game-mechanics';
import { composeShapeForm } from '../../forms';

@Component({
  selector: 'rg-shapes-container',
  templateUrl: './shapes.container.html',
  styles: []
})
export class ShapesContainerComponent extends SmartBase {

  formDefinition = composeShapeForm;
  readonly key = ALL_ENTITIES.shapes;

  constructor(public store: Store<AppState>) { super(store) }

}
