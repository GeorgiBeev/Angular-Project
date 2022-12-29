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
    const dayWeek={'1': 'Понеделник', '2': 'Вторник', '3': 'Сряда', '4': 'Четвъртък', '5': 'Петък', '6': 'Събота', '0': 'Неделя',}
    let monthArr = [];
    let now = new Date();
    let date = now.getDate();
    for (let i = date; i < date + 90; i++) {
        now.setDate(i);

        let curDate = '' + now.getDate();
        let curMonth = '' + (now.getMonth() + 1);
        let curYear = now.getFullYear();
        let curDay= now.getDay();
        let curStr = '' + curDate.padStart(2, '0') + '.' + curMonth.padStart(2, '0') + '.' + curYear + 'г.'+' ('+dayWeek[curDay]+')';

        monthArr.push(curStr);

        now = new Date();
    }
    console.log(monthArr);

    return monthArr;
}

export function hourNow() {
    let now = new Date();
    let date ='' + now.getDate();
    let month ='' + (now.getMonth() + 1);
    let year ='' + now.getFullYear();
    let hour ='' + (now.getHours()+2);
    let minute ='' + now.getMinutes();
   
    return (year + month.padStart(2, '0') + date.padStart(2, '0') + hour.padStart(2, '0') + minute.padStart(2, '0'));
}

export function compare(reservationTime: string): boolean {
    let result: string = '';
    let currentTime = hourNow();
    let hour: string = reservationTime.slice(0, 2);
    let minute: string = reservationTime.slice(3, 5);
    let data: string = reservationTime.slice(12, 14);
    let month: string = reservationTime.slice(15, 17);
    let year: string = reservationTime.slice(18, 22);
    result = year + month + data + hour+ minute;



    return (Number(result) < Number(currentTime));
}

export function strToNum(themeName: string): number {
    let result: string = '';
    let hour: string = themeName.slice(0, 2);
    let minute: string = themeName.slice(3, 5);
    let data: string = themeName.slice(12, 14);
    let month: string = themeName.slice(15, 17);
    let year: string = themeName.slice(18, 22);
    result = year + month + data + hour + minute;
    return Number(result);
}

//'12:00 ч. на 25.04.2022г.'
//202204251200