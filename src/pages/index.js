import './index.css'

import { validation, apiConfig, buttonOpenEdit, popupEdit, buttonOpenAvatar, popupAvatar, popupAdd, fioInput, jobInput, buttonOpenAdd } from '../utils/constants.js'

import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from '../utils/data.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDeleteCards from "../components/PopupDeleteCards.js";

const validPopupEdit = new FormValidator(validation, popupEdit);
validPopupEdit.enableValidation();
const validPopupAdd = new FormValidator(validation, popupAdd);
validPopupAdd.enableValidation();
const validPopupAvatar = new FormValidator(validation, popupAvatar);
validPopupAvatar.enableValidation();

const section = new Section({ renderer: createElement }, '.elements');
const api = new Api(apiConfig);
const userInfo = new UserInfo({ usernameSelector: '.profile__title', descriptionSelector: '.profile__subtitle', useravatarSelector: '.profile__photo' });

let myId;

const popupAvatarForm = new PopupWithForm('.popup_avatar', avatarForm);
const popupDelete = new PopupDeleteCards('.popup_delete');
const popupImage = new PopupWithImage('.popup_photo');
const popupAddForm = new PopupWithForm('.popup_add', addForm);
const popupEditForm = new PopupWithForm('.popup_edit', editForm);

const getUserInfoAll = api.getUserInfo();
getUserInfoAll
    .then(res => {
        myId = res._id;
        userInfo.setUserInfo(res);
    })
    .catch(err => {
        console.log(err);
    })

const getInitialCards = api.getCards();
getInitialCards
    .then(res => {
        section.renderItems(res);
    })
    .catch(err => {
        console.log(err);
    })

function createElement(item) {
    const element = new Card(item, '.template__element', handlePhoto, myId, () => {
        popupDelete.open(() =>
            api.deleteCard(element.getId())
            .then(() => {
                element.deleteCard();
                popupDelete.close();
            })
            .catch((err) => {
                console.log(err);
            }));
    }, () => {
        api.like(element.getId())
            .then((res) => {
                element.handleLike();
                element.counterLikes(res);
            })
            .catch((err => {
                console.log(err);
            }))
    }, () => {
        api.dislike(element.getId())
            .then((res) => {
                element.handleDislike();
                element.counterLikes(res)
            })
            .catch((err) => {
                console.log(err);
            })
    })
    return element.createElement();
}

Promise.all(([getUserInfoAll, getInitialCards]))
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })

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

buttonOpenAvatar.addEventListener('click', () => {
    popupAvatarForm.open();
    validPopupAvatar.resetForm();
})

function handlePhoto(description, image) {
    popupImage.open(description, image);
}

function editForm(e) {
    popupEditForm.renderLoading(true, 'Сохранить');
    api.setUserInfo(e.username, e.description)
        .then(res => {
            userInfo.setUserInfo(res);
            popupEditForm.close();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            popupEditForm.renderLoading(false, 'Сохранить');
        })
}

function addForm(item) {
    popupAddForm.renderLoading(true, 'Сохранить');
    api.addNewCard(item.name, item.link)
        .then(res => {
            section.addItem(createElement(res));
            popupAddForm.close();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            this.renderLoading(false, 'Сохранить');
        })
}

function avatarForm(item) {
    popupAvatarForm.renderLoading(true, 'Сохранить');
    api.addNewAvatar(item)
        .then(res => {
            userInfo.setUserInfo(res);
            popupAvatarForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAvatarForm.renderLoading(false, 'Сохранить');
        })
}

popupAddForm.setEventListeners();
popupImage.setEventListeners();
popupEditForm.setEventListeners();
popupAvatarForm.setEventListeners();
popupDelete.setEventListeners();