import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormDefinition } from '@app/dynamic-forms';
import { composeImageForm } from '../../forms';
import { SmartBase } from '../../mixins';
import { AllEntity, ALL_ENTITIES} from '@app/game-mechanics';
import { AppState } from '@app/core';

@Component({
  selector: 'rg-image-asset-container',
  templateUrl: './image-asset-container.component.html',
  styleUrls: ['./image-asset-container.component.scss']
})
export class ImageAssetContainerComponent extends SmartBase {

  formDefinition: FormDefinition = composeImageForm;

  public readonly key: AllEntity = ALL_ENTITIES.images ;

  constructor(public store: Store<AppState>) { super(store); }

}
