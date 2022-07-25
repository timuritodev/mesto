import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from './data.js';

const validation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const buttonOpenEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const buttonCloseEdit = document.querySelector('.popup__close-button');
const editForm = document.querySelector('.popup__info');
const fioInput = document.querySelector('.popup__input_fio');
const jobInput = document.querySelector('.popup__input_job');
const fio = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

const buttonOpenAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const buttonCloseAdd = document.querySelector('.popup__close-button-add');
const formAdd = document.querySelector('.popup__info_add');
const titleInput = document.querySelector('.popup__input_title');
const urlInput = document.querySelector('.popup__input_url');

const popupPhoto = document.querySelector('.popup_photo');
const popupImage = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__description');
const buttonClosePhoto = document.querySelector('.popup__close-button-photo');

const templateElement = document.querySelector('.template__element').content;
const elements = document.querySelector('.elements');

const validPopupEdit = new FormValidator(validation, popupEdit);
validPopupEdit.enableValidation();
const validPopupAdd = new FormValidator(validation, popupAdd);
validPopupAdd.enableValidation();

function openPopup(popup) {
    popup.classList.add('popup_hidden');
    document.addEventListener('click', closeByClick);
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_hidden');
    document.removeEventListener('click', closeByClick);
    document.removeEventListener('keydown', closeByEsc);
}

function closeByClick(e) {
    if (e.target.classList.contains('popup')) {
        closePopup(e.target);
    }
}

function closeByEsc(e) {
    if (e.key === 'Escape') {
        const popup = document.querySelector('.popup_hidden');
        closePopup(popup);
    }
}

buttonOpenEdit.addEventListener('click', function() {
    openPopup(popupEdit);
    fioInput.value = fio.textContent;
    jobInput.value = job.textContent;
    validPopupEdit.resetForm();
})

buttonCloseEdit.addEventListener('click', function() {
    closePopup(popupEdit);
})

editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fio.textContent = fioInput.value;
    job.textContent = jobInput.value;
    closePopup(popupEdit);
})

buttonOpenAdd.addEventListener('click', function() {
    openPopup(popupAdd);
    validPopupAdd.resetForm();
})

buttonCloseAdd.addEventListener('click', function() {
    closePopup(popupAdd);
})

function createElement(e) {
    const element = new Card(e.name, e.link, '.template__element');
    return element.generateCard();
}

function addElement(title, link) {
    const newElement = createElement({ name: title, link: link });
    elements.prepend(newElement);
}

export function handlePhoto(image, description) {
    popupImage.src = image;
    popupImage.alt = description;
    popupDescription.textContent = description;
    openPopup(popupPhoto);
}

buttonClosePhoto.addEventListener('click', function() {
    closePopup(popupPhoto);
})

formAdd.addEventListener('submit', function(e) {
    e.preventDefault();
    addElement(titleInput.value, urlInput.value);
    formAdd.reset();
    closePopup(popupAdd);
})

function render() {
    initialCards.forEach((item) =>
        addElement(item.name, item.link));
}

render();