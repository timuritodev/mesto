import './index.css'

import { validation, apiConfig, buttonOpenEdit, popupEdit, popupAdd, fioInput, jobInput, buttonOpenAdd } from '../utils/constants.js'

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from '../utils/data.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const validPopupEdit = new FormValidator(validation, popupEdit);
validPopupEdit.enableValidation();
const validPopupAdd = new FormValidator(validation, popupAdd);
validPopupAdd.enableValidation();

const section = new Section({ items: initialCards, renderer: createElement }, '.elements');

const popupImage = new PopupWithImage('.popup_photo');
const popupAddForm = new PopupWithForm('.popup_add', formAdd);
const userInfo = new UserInfo({ usernameSelector: '.profile__title', descriptionSelector: '.profile__subtitle' });
const popupEditForm = new PopupWithForm('.popup_edit', editForm);

buttonOpenEdit.addEventListener('click', function() {
    const { username, description } = userInfo.getUserInfo();
    fioInput.value = username;
    jobInput.value = description;
    popupEditForm.open();
    validPopupEdit.resetForm();
})

buttonOpenAdd.addEventListener('click', function() {
    popupAddForm.open();
    validPopupAdd.resetForm();
})

function createElement(e) {
    const element = new Card(e.name, e.link, '.template__element', handlePhoto);
    section.addItem(element.generateCard());
}

function handlePhoto(description, image) {
    popupImage.open(description, image);
}

function editForm(e) {
    const { username, description } = e;
    userInfo.setUserInfo(username, description);
    popupEditForm.close();
}

function formAdd(e) {
    const element = createElement({ name: e.name, link: e.link }, '.elements');
    popupAddForm.close();
}

popupAddForm.setEventListeners();
popupImage.setEventListeners();
popupEditForm.setEventListeners();

section.renderItems();