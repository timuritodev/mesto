import Popup from './Popup.js'

export default class PopupDeleteCards extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form-delete');
    }

    open(deleteCard) {
        super.open();
        this._deleteCard = deleteCard;
    }

    _handleDeleteCard = (e) => {
        e.preventDefault();
        this._deleteCard;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleDeleteCard);
    }
}