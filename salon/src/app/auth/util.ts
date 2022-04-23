import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;


    if (!value) {
        return null
    }

    if (!/.+@.+\..+/.test(value)) {
        return {
            email: true,
        }
    }
    return null;
}


export function passwordMatch(passwordFormControl: AbstractControl) {
    return (rePasswordFormControl: AbstractControl) => {
        if (passwordFormControl.value !== rePasswordFormControl.value) {
            return {
                passwordMissmatch: true
            }
        }

        return null;
    }
}

export function nextMonth() {
    let monthArr = [];
    let now = new Date();
    let day = now.getDate() + 1;
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    for (let i = day; i < 31; i++) {
        monthArr.push(i + '.' + month + '.' + year+'г.');
    }
    for (let i = 1; i < day; i++) {
        monthArr.push(i + '.' + (month + 1) + '.' + year+'г.');
    }

    return monthArr


}
//"January","February","March","April","May","June","July","August","September","October","November","December"