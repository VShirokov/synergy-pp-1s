import {
    ALARM_TEXT,
    DISABLED_ATTRIBUTE_STRING,
    NEGATIVE_RESULT_CLASSNAME,
    NEUTRAL_RESULT_CLASSNAME,
    POSITIVE_RESULT_CLASSNAME
} from "./constants.js";

const plusButton = document.querySelector('.counter--plus');
const minusButton = document.querySelector('.counter--minus');
const resultWrapper = document.querySelector('.result');
const resultContainer = document.querySelector('.result__counter');
const alarmContainer = document.querySelector('.alarm-text');

if (
    !plusButton
    || !minusButton
    || !resultContainer
    || !resultWrapper
    || !alarmContainer
    ) throw new Error('required DOM node not found');

let result = 0;

resultWrapper.classList.add(NEUTRAL_RESULT_CLASSNAME);

plusButton.addEventListener('click', () => {
    result += 1;
    if (result === 10) {
        plusButton.setAttribute(DISABLED_ATTRIBUTE_STRING, 'true');
        alarmContainer.innerText = ALARM_TEXT;
    } else if (minusButton.hasAttribute(DISABLED_ATTRIBUTE_STRING)){
        minusButton.removeAttribute(DISABLED_ATTRIBUTE_STRING);
        alarmContainer.innerText = '';
    }
    modifyResult(result);
})

minusButton.addEventListener('click', () => {
    result -= 1
    if (result === -10) {
        minusButton.setAttribute(DISABLED_ATTRIBUTE_STRING, 'true');
        alarmContainer.innerText = ALARM_TEXT;
    } else if (plusButton.hasAttribute(DISABLED_ATTRIBUTE_STRING)) {
        plusButton.removeAttribute(DISABLED_ATTRIBUTE_STRING);
        alarmContainer.innerText = '';
    }
    modifyResult(result);
})

function modifyResult(newCount) {
    resultContainer.innerText = newCount;
    if (result > 0) {
        resultWrapper.classList.remove(NEUTRAL_RESULT_CLASSNAME);
        resultWrapper.classList.add(POSITIVE_RESULT_CLASSNAME);
    } else if (result < 0) {
        resultWrapper.classList.remove(NEUTRAL_RESULT_CLASSNAME);
        resultWrapper.classList.add(NEGATIVE_RESULT_CLASSNAME);
    } else if (result === 0) {
        resultWrapper.classList.remove(POSITIVE_RESULT_CLASSNAME, NEGATIVE_RESULT_CLASSNAME);
        resultWrapper.classList.add(NEUTRAL_RESULT_CLASSNAME);
    }
}
