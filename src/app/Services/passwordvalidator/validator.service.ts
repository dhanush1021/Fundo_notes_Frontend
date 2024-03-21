import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  static patternvalidator(regex : RegExp, error : ValidationErrors) : ValidatorFn
  {
    return (control:AbstractControl):{[Key:string] : boolean} | null =>{
      if(!control.value){
        return null
      }
      const valid = regex.test(control.value)
      return valid ? null : error
    }
  }
}
