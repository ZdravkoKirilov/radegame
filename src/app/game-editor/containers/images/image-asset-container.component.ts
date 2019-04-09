import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormDefinition } from '@app/dynamic-forms';
import { composeImageForm } from '../../forms';
import { FormKey, formKeys } from '../../state';
import { SmartBase } from '../../mixins';
import { AppState } from '@app/core';

@Component({
  selector: 'rg-image-asset-container',
  templateUrl: './image-asset-container.component.html',
  styleUrls: ['./image-asset-container.component.scss']
})
export class ImageAssetContainerComponent extends SmartBase {

  formDefinition: FormDefinition = composeImageForm;

  public readonly key: FormKey = formKeys.images as FormKey;

  constructor(public store: Store<AppState>) { super(store); }

}
