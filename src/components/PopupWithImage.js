import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._description = this._popup.querySelector('.popup__description');
    }

    open(title, link) {
        super.open();
        this._image.src = link;
        this._image.alt = title;
        this._description.textContent = title;
    }
}