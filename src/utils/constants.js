export const validation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-48',
    headers: {
        authorization: '9e48cf18-b746-4718-9bb6-c10376174994',
        'Content-Type': 'application/json'
    }
}

export const buttonOpenEdit = document.querySelector('.profile__edit-button');
export const buttonOpenAdd = document.querySelector('.profile__add-button');
export const buttonOpenAvatar = document.querySelector('.profile__avatar-container')
export const popupEdit = document.querySelector('.popup_edit');
export const popupAdd = document.querySelector('.popup_add');
export const popupAvatar = document.querySelector('.popup_avatar');
export const fioInput = document.querySelector('.popup__input_fio');
export const jobInput = document.querySelector('.popup__input_job');