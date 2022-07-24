/////////////////////////////////

export class FormValidator {
    constructor(validSettings, formSelector) {
        this._validSettings = validSettings;
        this._formSelector = formSelector;

        this._inputList = Array.from(
            this._formSelector.querySelectorAll(this._validSettings.inputSelector)
        );
        this._buttonElement = this._formSelector.querySelector(
            this._validSettings.submitButtonSelector
        );
    }

    _showinputError(inputElement, errorMessage) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validSettings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validSettings.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validSettings.inputErrorClass);
        errorElement.classList.remove(this._validSettings.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function() {
                this._checkInputValidity(inputElement);
                this._toggleButtonState()
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', '');
            this._buttonElement.classList.add(this._validSettings.inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._validSettings.inactiveButtonClass);
        }
    }

    resetForm() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}