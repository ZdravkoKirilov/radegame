import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { ALL_ENTITIES } from '@app/game-mechanics';

import { SmartBase } from '../../mixins';
import { composeShapeForm } from '../../forms';
import { selectExpressionContext } from '../../state';

@Component({
  selector: 'rg-shapes-container',
  templateUrl: './shapes.container.html',
  styles: []
})
export class ShapesContainerComponent extends SmartBase implements OnInit {

  formDefinition = composeShapeForm;
  readonly key = ALL_ENTITIES.shapes;

  expressionContext$ = this.store.pipe(
    map(state => {
      const context = selectExpressionContext(state);
      return context;
    })
  );

  constructor(public store: Store<AppState>) { super(store) }

}
