export class Card {
    constructor(item, cardSelector, handlePhoto, myId, handleCardDelete, like, dislike) {
        this._title = title;
        this._link = link;
        this._item = item;
        this._likes = item.likes;
        this._id = item._id;
        this._cardSelector = cardSelector;
        this._handlePhoto = handlePhoto;
        this._myId = myId;
        this._ownerId = item._owner._Id;
        this._handleCardDelete = handleCardDelete;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector('.element')
            .cloneNode(true)

        return cardElement;
    }

    getId() {
        return this._id;
    }

    handleLike() {
        this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }

    handleDislike() {
        this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');
    }

    _checkLikes() {
        this._likes.forEach((like) => {
            if (like._id === this._myId) {
                this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
            }
        });
    }

    counterLikes(item) {
        this._element.querySelector('.element__like-counter').textContent = item.likes.length;
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._like.addEventListener('click', () => {
            if (this._element.classList.contains('element__like-button-active')) {
                this._dislike();
            } else {
                this._like();
            }
        });

        if (this._ownerId === this._myId) {
            this._element.querySelector('.element__delete-button').addEventListener('click', () => {
                this._handleCardDelete();
            });
        }

        this._image.addEventListener('click', () => {
            this._handlePhoto(this._title, this._link);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._like = this._element.querySelector('.element__like-button');
        if (this._ownerId !== this._myId) {
            this._element.querySelector('.element__delete-button').remove();
        }
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;
        this.counterLikes(this._item);
        this._checkLikes();
        this._setEventListeners();

        return this._element;
    }
}