const showInputError = (formElement, inputElement, errorMessage, action) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(action.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(action.errorClass);
};

const hideInputError = (formElement, inputElement, action) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(action.inputErrorClass);
    errorElement.classList.remove(action.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, action) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, action);
    } else {
        hideInputError(formElement, inputElement, action);
    }
};

const setEventListeners = (formElement, action) => {
    const inputList = Array.from(formElement.querySelectorAll(action.inputSelector));
    const buttonElement = formElement.querySelector(action.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, action)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, action);
            toggleButtonState(inputList, buttonElement, action)
        });
    });
};

const enableValidation = (action) => {
    const formList = Array.from(document.querySelectorAll(action.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, action);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, action) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', '');
        buttonElement.classList.add(action.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(action.inactiveButtonClass);
    }
};

const resetForm = (action, popup) => {
    const formElement = popup.querySelector(action.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(action.inputSelector));
    const buttonElement = formElement.querySelector(action.submitButtonSelector);
    inputList.forEach(inputElement => hideInputError(formElement, inputElement, action));
    toggleButtonState(inputList, buttonElement, action);
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});