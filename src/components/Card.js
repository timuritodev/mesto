import { handlePhoto } from "../pages/index.js";

export class Card {
    constructor(title, link, cardSelector) {
        this._title = title;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector('.element')
            .cloneNode(true)

        return cardElement;
    }

    _handleLike() {
        this._like.classList.toggle('element__like-button_active');
    }

    _handleDelete() {
        this._element.remove();
        this._element = null;
    }

    _handlePhoto() {
        handlePhoto(this._link, this._title);
    }

    _setEventListeners() {
        this._like.addEventListener('click', () => {
            this._handleLike();
        });

        this._delete.addEventListener('click', () => {
            this._handleDelete();
        });

        this._image.addEventListener('click', () => {
            this._handlePhoto();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._like = this._element.querySelector('.element__like-button');
        this._delete = this._element.querySelector('.element__delete-button');
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;
        this._setEventListeners();

        return this._element;
    }
}