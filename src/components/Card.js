export default class Card {
    constructor(item, cardSelector, handlePhoto, myId, handleCardDelete, like, dislike) {
        this._item = item;
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes;
        this._id = item._id;
        this._cardSelector = cardSelector;
        this._handlePhoto = handlePhoto;
        this._myId = myId;
        this._ownerId = item.owner._id;
        this._like = like;
        this._dislike = dislike;
        this._handleCardDelete = handleCardDelete;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content.querySelector('.element')
            .cloneNode(true)
    }

    getId() {
        return this._id;
    }

    handleLike() {
        this._likeButton.classList.add('element__like-button_active');
    }

    handleDislike() {
        this._likeButton.classList.remove('element__like-button_active');
    }

    _checkLikes() {
        this._likes.forEach((like) => {
            if (like._id === this._myId) {
                this._likeButton.classList.add('element__like-button_active');
            }
        });
    }

    counterLikes(item) {
        this._counter.textContent = item.likes.length;
    }

    deleteCard() {
        this._element.closest('.element').remove();
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('element__like-button_active')) {
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
            this._handlePhoto(this._name, this._link);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._counter = this._element.querySelector('.element__like-counter');
        if (this._ownerId !== this._myId) {
            this._element.querySelector('.element__delete-button').remove();
        }
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this.counterLikes(this._item);
        this._checkLikes();
        this._setEventListeners();

        return this._element;
    }
}