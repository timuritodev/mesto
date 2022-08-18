export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeByEsc = this._closeByEsc.bind(this);
    }
    open() {
        this._popup.classList.add('popup_hidden');
        document.addEventListener('keydown', this._closeByEsc)
    }

    close() {
        this._popup.classList.remove('popup_hidden');
        document.removeEventListener('keydown', this._closeByEsc)
    }

    _closeByEsc(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');
        this._popup.addEventListener('click', (e) => {
            if (e.target === closeButton || e.target.classList.contains('popup')) {
                this.close();
            }
        })
    }
}