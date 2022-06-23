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
    popup.classList.remove('popup_hidden');
}

function closePopup(popup) {
    popup.classList.add('popup_hidden')
}

openEditButton.addEventListener('click', function() {
    openPopup(popupEdit);
    fioInput.value = fio.textContent;
    jobInput.value = job.textContent;
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
})

closeAddButton.addEventListener('click', function() {
    closePopup(popupAdd);
})

function handleLike(e) {
    e.target.classList.toggle('element__like-button_active');
}

function handleDelete(e) {
    e.target.closest('.element').remove();
}

function handlePhoto(image, description) {
    popupImage.src = image;
    popupImage.alt = description;
    popupDescription.textContent = description;
    openPopup(popupPhoto);
}

closePhotoButton.addEventListener('click', function() {
    closePopup(popupPhoto);
})

function addElement(title, link) {
    const newElement = createElement({ name: title, link: link });
    elements.prepend(newElement);
}

addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addElement(titleInput.value, urlInput.value);
    addForm.reset();
    closePopup(popupAdd);
})

function createElement(e) {
    const element = templateElement.querySelector('.element').cloneNode(true);
    const elementImage = element.querySelector('.element__image');
    const elementTitle = element.querySelector('.element__title');
    const elementLike = element.querySelector('.element__like-button');
    const elementDelete = element.querySelector('.element__delete-button');
    elementImage.src = e.link;
    elementImage.alt = e.name;
    elementTitle.textContent = e.name;
    elementLike.addEventListener('click', handleLike);
    elementDelete.addEventListener('click', handleDelete);
    elementImage.addEventListener('click', () => handlePhoto(e.link, e.name));
    return element;
}

function render() {
    initialCards.forEach(item =>
        addElement(item.name, item.link));
}

render();