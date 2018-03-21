import {  ValidatorFn } from '@angular/forms';

import { patternValidator } from './pattern.validator';
import { isEmail } from './regex.list';

export const emailValidator: ValidatorFn = patternValidator(isEmail, 'email', 'Invalid email');