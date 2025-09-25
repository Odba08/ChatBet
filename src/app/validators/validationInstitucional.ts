import { AbstractControl, ValidationErrors } from "@angular/forms";

export function validationInstitucional(forbiddenDomins: string[]) {

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; 

      const email: string = control.value.toLowerCase();
      const domain = email.substring(email.lastIndexOf("@") + 1).toLowerCase();
    
      if (forbiddenDomins.includes(domain)) {
        return { 'forbiddenDomain': true };
      }
       
      return null;
  }

}