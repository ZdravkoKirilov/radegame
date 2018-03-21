import { AbstractControl, ValidatorFn } from '@angular/forms';

export function patternValidator(regexp: RegExp, name: string, message: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (value === '') {
            return null;
        }
        return !regexp.test(value) ? { [name]: message } : null;
    };
}