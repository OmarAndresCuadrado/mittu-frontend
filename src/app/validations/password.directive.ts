import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordValidation(): ValidatorFn {
  return (control: AbstractControl) => {
    const passwordValidationDirective = new PasswordDirective();
    return passwordValidationDirective.validate(control);
  }
 }


@Directive({
  selector: '[passwordValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordDirective, multi: true }]

})
export class PasswordDirective implements Validator {

  knowPasswords = ['123456', 'querty', '123456789'];

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    const password = <string>control.value;

    if (!password) { return; }
    if (password.length < 4) { return; }

    if (this.knowPasswords.indexOf(password) !== -1) {
      return { 'passwordValidation': { 'message': 'Escoge un mejor password' } }
    }

    if (password === password.toLowerCase()) {
      return { 'passwordValidation': { 'message': 'Tu password debe de contener mayúsculas' } }
    }

    if (password === password.toUpperCase()) {
      return { 'passwordValidation': { 'message': 'Tu password debe de contener minúsculas' } }
    }

    if (!/\d/.test(password)) {
      return { 'passwordValidation': { 'message': 'Tu password debe de incluir un caracter numérico' } }
    }

    return null;



  }

  constructor() { }

}