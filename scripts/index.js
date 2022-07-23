import { Card } from "./Card.js";

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const openEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const closeEditButton = document.querySelector('.popup__close-button');
const editForm = document.querySelector('.popup__info');
const fioInput = document.querySelector('.popup__input_fio');
const jobInput = document.querySelector('.popup__input_job');
const fio = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

const openAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const closeAddButton = document.querySelector('.popup__close-button-add');
const addForm = document.querySelector('.popup__info_add');
const titleInput = document.querySelector('.popup__input_title');
const urlInput = document.querySelector('.popup__input_url');


const popupPhoto = document.querySelector('.popup_photo');
const popupImage = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__description');
const closePhotoButton = document.querySelector('.popup__close-button-photo');

const templateElement = document.querySelector('.template__element').content;
const elements = document.querySelector('.elements');

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

openEditButton.addEventListener('click', function() {
    openPopup(popupEdit);
    fioInput.value = fio.textContent;
    jobInput.value = job.textContent;
    resetForm(validation, popupEdit);
})

closeEditButton.addEventListener('click', function() {
    closePopup(popupEdit);
})

editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fio.textContent = fioInput.value;
    job.textContent = jobInput.value;
    closePopup(popupEdit);
})

openAddButton.addEventListener('click', function() {
    openPopup(popupAdd);
    resetForm(validation, popupAdd);
})

closeAddButton.addEventListener('click', function() {
    closePopup(popupAdd);
})

function createElement(e) {
    const element = new Card(
        e.name,
        e.link,
        '.template__element'
    );

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

closePhotoButton.addEventListener('click', function() {
    closePopup(popupPhoto);
})

addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addElement(titleInput.value, urlInput.value);
    addForm.reset();
    closePopup(popupAdd);
})

initialCards.forEach((item) => {
    addElement(item.name, item.link);
});