import * as R from 'ramda';

// ADDITION RAMDA HELPERS
export const isTrue = R.equals(true);
export const isFalse = (value) => R.equals(value, false);
export const isNot = R.complement(R.is);
export const isNotNil = R.complement(R.isNil);
export const notEquals = R.complement(R.equals);
export const isNotEmpty = R.complement(R.isEmpty);
export const notContain = R.complement(R.contains);
export const isNaN = R.equals(NaN);
export const isNotNaN = notEquals(NaN);
export const notHas = R.complement(R.has);
export const isNotNilAndNotEmpty = (value) => R.and(isNotNil(value), isNotEmpty(value));
export const isNilOrEmpty = (value) => R.or(R.isNil(value), R.isEmpty(value));
export const isZero = (value) => R.equals(value, 0);
export const isNotZero = (value) => notEquals(value, 0);
export const isNilOrZero = (value) => R.or(R.isNil(value), isZero(value));
export const isNotNilAndNotZero = (value) => R.and(isNotNil(value), isNotZero(value));
export const mapIndexed = R.addIndex(R.map);
export const isAllTrue = (...arg) => R.all(isTrue, arg);
export const isAllFalse = (...arg) => R.all(isFalse, arg);
export const isAllNilOrEmpty = R.all(isNilOrEmpty);
export const isAllNotNilOrNotEmpty = R.all(isNotNilAndNotEmpty);
export const isAnyNilOrEmpty = R.any(isNilOrEmpty);
export const isOneNotNilOrNotEmpty = R.any(isNotNilAndNotEmpty);
export const isFunction = R.is(Function);
export const isObject = R.is(Object);
export const isArray = R.is(Array);
export const isBoolean = R.is(Boolean);
export const isString = R.is(String);
export const isNumber = R.is(Number);

export const convertToBoolean = (value) => {
    if (R.is(String, value)) {
        return value == 'true' ? true : false

    }
    return value
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
  
export const transformTextFontSize = (el) => {
    if (R.isNil(el.current)) {
        return null
    }   
    let innerText = el.current.innerText;
    let fontSize = parseInt(window.getComputedStyle(el.current).getPropertyValue("font-size"));
    if (innerText.length > 40) {
        el.current.style.wordWrap = 'break-word';
        for (let i = fontSize; i >= 0; i--) {
            let overflow = isOverflown(el.current);
            if (fontSize === 15) {
                return el.current.style.fontSize = fontSize + "px";
            }   
            if (overflow) {
             fontSize--;
             el.current.style.fontSize = fontSize + "px";
            }
        }
        return fontSize;

    } else if (innerText.length > 20) {
        return el.current.style.wordWrap = 'break-word';
    }
  }
