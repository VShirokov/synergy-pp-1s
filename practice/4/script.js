import { ERROR_CLASSNAME, ERROR_EMPTY_VALUE, ERROR_NOT_NUMBER } from "./constants.js";

const firstInput = document.querySelector('.input-count--first-number');
const secondInput = document.querySelector('.input-count--second-number');

const actionSum = document.querySelector('.actions__activity--sum');
const actionDiff = document.querySelector('.actions__activity--diff');
const actionMultipl = document.querySelector('.actions__activity--multipl');
const actionDivision = document.querySelector('.actions__activity--division');

const resultField = document.querySelector('.result-area');

if (
    !firstInput
    || !secondInput
    || !actionSum
    || !actionDiff
    || !actionMultipl
    || !actionDivision
    || !resultField
    ) throw new Error('required DOM node not found');

function throwError(errorMessage) {
    resultField.value = errorMessage;
    throw new Error(errorMessage)
}

function validateValue(node, inputName) {
    const value = node.value;

    if (!value) {
        if (!node.classList.contains(ERROR_CLASSNAME)) node.classList.add(ERROR_CLASSNAME);
        const errorMessage = `value in ${inputName} is empty`;
        resultField.classList.add(ERROR_EMPTY_VALUE);
        throwError(errorMessage);
        return;
    }

    if (!isFinite(value)) {
        if (!node.classList.contains(ERROR_CLASSNAME)) node.classList.add(ERROR_CLASSNAME);
        const errorMessage = `value "${value}" in ${inputName} is not a number`;
        resultField.classList.add(ERROR_NOT_NUMBER);
        throwError(errorMessage);
    }
}

function validateInputValues() {
    validateValue(firstInput, 'first input');
    validateValue(secondInput, 'second input');
}

function onChangeInput(event) {
    const { target: {
        value, classList
    } } = event;


    if (resultField.classList.contains(ERROR_EMPTY_VALUE) && value) {
        classList.remove(ERROR_CLASSNAME);
        if (resultField.classList.contains(ERROR_EMPTY_VALUE)) {
            resultField.classList.remove(ERROR_EMPTY_VALUE);
            resultField.value = '';
        }
        return;
    }

    if (resultField.classList.contains(ERROR_NOT_NUMBER) && isFinite(value)) {
        classList.remove(ERROR_CLASSNAME)
        if (resultField.classList.contains(ERROR_NOT_NUMBER)) {
            resultField.classList.remove(ERROR_NOT_NUMBER);
            resultField.value = '';
        }
    }
}

firstInput.addEventListener('input', onChangeInput);
secondInput.addEventListener('input', onChangeInput);

actionSum.addEventListener('click', () => {
    const firstNumber = firstInput.value;
    const secondNumber = secondInput.value;
    validateInputValues(firstNumber, secondNumber);

    resultField.value = Number(firstNumber) + Number(secondNumber);
});
actionDiff.addEventListener('click', () => {
    const firstNumber = firstInput.value;
    const secondNumber = secondInput.value;
    validateInputValues(firstNumber, secondNumber);

    resultField.value = Number(firstNumber) - Number(secondNumber);
});
actionMultipl.addEventListener('click', () => {
    const firstNumber = firstInput.value;
    const secondNumber = secondInput.value;
    validateInputValues(firstNumber, secondNumber);

    resultField.value = Number(firstNumber) * Number(secondNumber);
});
actionDivision.addEventListener('click', () => {
    const firstNumber = firstInput.value;
    const secondNumber = secondInput.value;
    validateInputValues(firstNumber, secondNumber);

    if (Number(secondNumber) === 0) {
        errorMessage = 'You cannot divide by zero';
        resultField.value = errorMessage;
        throw new Error(errorMessage);
    }
    resultField.value = Number(firstNumber) / Number(secondNumber);
});
