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
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let nextMonth = month + 1;
    let monthStr = '';
    let nextMonthStr = '';
    let year = now.getFullYear();
    if (month < 10) {
        monthStr = '0' + month;
    } else {
        monthStr = '' + month;
    }
    if (nextMonth < 10) {
        nextMonthStr = '0' + nextMonth;
    } else {
        nextMonthStr = '' + nextMonth;
    }
    for (let i = day; i < 31; i++) {
        let iStr = '';
        if (i < 10) {
            iStr = '0' + i;
        } else {
            iStr = '' + i;
        }
        monthArr.push(iStr + '.' + monthStr + '.' + year + 'г.');
    }
    for (let i = 1; i <= day; i++) {
        let iStr = '';
        if (i < 10) {
            iStr = '0' + i;
        } else {
            iStr = '' + i;
        }
        monthArr.push(iStr + '.' + nextMonthStr + '.' + year + 'г.');
    }

    return monthArr


}

export function hourNow() {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let minuteStr = '';
    let dayStr = '';
    let monthStr = '';
    let hourStr = '';
    if (minute < 10) {
        minuteStr = '0' + minute;
    } else {
        minuteStr = '' + minute;
    }
    if (hour < 10) {
        hourStr = '0' + hour;
    } else {
        hourStr = '' + hour;
    }
    if (day < 10) {
        dayStr = '0' + day;
    } else {
        dayStr = '' + day;
    }
    if (month < 10) {
        monthStr = '0' + month;
    } else {
        monthStr = '' + month;
    }
    return ('' + year + monthStr + dayStr + hourStr + minuteStr);
}

export function compare(reservationTime: string): boolean {
    let result: string = '';
    let currentTime = hourNow();
    let hour: string = reservationTime.slice(0, 2);
    let minute: string = reservationTime.slice(3, 5);
    let data: string = reservationTime.slice(12, 14);
    let month: string = reservationTime.slice(-9, -7);
    let year: string = reservationTime.slice(-6, -2);
    result = year + month + data + hour + minute;



    return (Number(result) < Number(currentTime));
}

export function strToNum(themeName: string): number {
    let result: string = '';
    let hour: string = themeName.slice(0, 2);
    let minute: string = themeName.slice(3, 5);
    let data: string = themeName.slice(12, 14);
    let month: string = themeName.slice(-9, -7);
    let year: string = themeName.slice(-6, -2);
    result = year + month + data + hour + minute;
    return Number(result);
}

//'12:00 ч. на 25.04.2022г.'
//202204251200