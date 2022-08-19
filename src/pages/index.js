import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from '../utils/data.js';
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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
const buttonCloseAdd = document.querySelector('.popup__close-button-add');
const formAdd = document.querySelector('.popup__info_add');
const titleInput = document.querySelector('.popup__input_title');
const urlInput = document.querySelector('.popup__input_url');

const popupPhoto = document.querySelector('.popup_photo');
const popupDescription = document.querySelector('.popup__description');
const buttonClosePhoto = document.querySelector('.popup__close-button-photo');

const templateElement = document.querySelector('.template__element').content;
const elements = document.querySelector('.elements');

const validPopupEdit = new FormValidator(validation, popupEdit);
validPopupEdit.enableValidation();
const validPopupAdd = new FormValidator(validation, popupAdd);
validPopupAdd.enableValidation();
const section = new Section({ items: initialCards, renderer: createElement }, '.elements');
const popupImage = new PopupWithImage('.popup__image');
const popupAdd = new PopupWithForm('.popup_add', formAdd);
const userInfo = new UserInfo({ usernameSelector: profile__title, descriptionSelector: profile__subtitle });
const popupForm = new PopupWithForm('.popup_edit', editForm);

buttonOpenEdit.addEventListener('click', function() {
    const { username, description } = userInfo.getUserInfo();
    fioInput.value = username;
    jobInput.value = description;
    popupForm.open();
    validPopupEdit.resetForm();
})

buttonOpenAdd.addEventListener('click', function() {
    popupAdd.open();
    validPopupAdd.resetForm();
})

function createElement(e) {
    const element = new Card(e.name, e.link, '.template__element');
    return element.generateCard();
}

export function handlePhoto(description, image) {
    popupImage.open(description, image);
}

function editForm(e) {
    e.preventDefault();
    const { username, description } = e;
    userInfo.setUserInfo(username, description);
    popupForm.close();
}

function formAdd(e) {
    e.preventDefault();
    const element = createElement({ name: e.title, link: e.url }, '.elements');
    section.addItem(element);
    popupAdd.close();
}

popupAdd.setEventListeners();
popupImage.setEventListeners();
popupForm.setEventListeners();

section.renderItems();