import { FormArray } from '@angular/forms';
import { BaseControl } from '../models';

export const minItems = (data: BaseControl) => (control: FormArray): { [key: string]: any } => {
  let aboveMin = null;

  if (data.minItems && data.minItems > control.value.length) {
    aboveMin = {
      minItems: { value: control.value.length }
    };
  }

  return aboveMin as any;
};

export const maxItems = (data: BaseControl) => (control: FormArray): { [key: string]: any } => {
  let aboveMin = null;

  if (data.minItems && data.maxItems! > control.value.length) {
    aboveMin = {
      maxItems: { value: control.value.length }
    };
  }

  return aboveMin as any;
};
