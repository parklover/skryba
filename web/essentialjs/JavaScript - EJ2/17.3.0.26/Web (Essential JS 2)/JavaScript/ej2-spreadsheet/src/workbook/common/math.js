import { isNullOrUndefined, getDefaultDateObject } from '@syncfusion/ej2-base';
/**

 */
export function toFraction(val) {
    var strVal = val.toString();
    if (val === parseInt(strVal, 10)) {
        return parseInt(strVal, 10) + '  ';
    }
    else {
        var top_1 = strVal.indexOf('.') > -1 ? strVal.split('.')[1] : 0;
        var bottom = Math.pow(10, top_1.toString().replace('-', '').length);
        var abs = Math.abs(getGcd(top_1, bottom));
        return (top_1 / abs) + '/' + (bottom / abs);
    }
}
/**

 */
export function getGcd(a, b) {
    a = Number(a);
    b = Number(b);
    return (b) ? getGcd(b, a % b) : a;
}
/**

 */
export function intToDate(val) {
    val = Number(val);
    val = (val > 0 && val < 1) ? (1 + val) : (val === 0) ? 1 : val;
    if (val > 60) {
        val -= 1; // Due to leap year issue of 1900 in MSExcel.
    }
    return new Date(((val - 1) * (1000 * 3600 * 24)) + new Date('01/01/1900').getTime());
}
/**

 */
/* tslint:disable no-any */
export function dateToInt(val, isTime) {
    var startDate = new Date('01/01/1900');
    var date = isDateTime(val) ? val : new Date(val);
    var timeDiff = (date.getTime() - startDate.getTime());
    var diffDays = (timeDiff / (1000 * 3600 * 24)) + 1;
    return isTime ? diffDays + 1 : parseInt(diffDays.toString(), 10) + 2;
}
/**

 */
export function isDateTime(date) {
    return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.valueOf());
}
/**

 */
export function isNumber(val) {
    return val - parseFloat(val) >= 0;
}
/**

 */
export function toDate(text, intl) {
    var defaultDateFormats = getDefaultDateObject();
    var availabelDateTimeFormat = defaultDateFormats.dateTimeFormats.availableFormats;
    var dObj = { dateObj: null, isCustom: false, type: '' };
    if (typeof text === 'string') {
        text = text.toUpperCase();
    }
    for (var _i = 0, _a = Object.keys(defaultDateFormats.dateFormats); _i < _a.length; _i++) {
        var key = _a[_i];
        dObj.dateObj = intl.parseDate(text, { format: defaultDateFormats.dateFormats[key], skeleton: key });
        if (dObj.dateObj) {
            dObj.type = 'date';
            dObj.isCustom = false;
            break;
        }
    }
    if (isNullOrUndefined(dObj.dateObj)) {
        for (var _b = 0, _c = Object.keys(availabelDateTimeFormat); _b < _c.length; _b++) {
            var key = _c[_b];
            dObj.dateObj = intl.parseDate(text, { format: availabelDateTimeFormat[key], skeleton: key });
            if (dObj.dateObj) {
                dObj.type = text.toString().indexOf(':') > -1 ? 'time' : 'datetime';
                dObj.isCustom = true;
                break;
            }
        }
    }
    if (isNullOrUndefined(dObj.dateObj)) {
        for (var _d = 0, _e = Object.keys(defaultDateFormats.timeFormats); _d < _e.length; _d++) {
            var key = _e[_d];
            dObj.dateObj = intl.parseDate(text, { format: defaultDateFormats.timeFormats[key], skeleton: key });
            if (dObj.dateObj) {
                dObj.type = 'time';
                dObj.isCustom = false;
                break;
            }
        }
    }
    if (text !== '#DIV/0!' && !dObj.dateObj && new Date(text).toString() !== 'Invalid Date') {
        dObj.dateObj = new Date(text);
    }
    return dObj;
}
