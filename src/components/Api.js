export default class Api {
    constructor(apiConfig) {
        this._url = apiConfig.url;
        this._headers = apiConfig.headers;
    }

    _check(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-48/users/me', {
                method: 'GET',
                headers: this._headers
            })
            .then(this._check)
    }

    getCards() {
        return fetch('GET https://mesto.nomoreparties.co/v1/cohort-48/cards', {
                method: 'GET',
                headers: this._headers
            })
            .then(this._check)
    }

    setUserInfo(username, description) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-48/users/me', {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: username,
                    about: description
                })
            })
            .then(this._check)
    }

    addNewCard(name, link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: link
                })
            })
            .then(this._check)
    }

    like(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._check);
    }

    removeLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._check);
    }

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._check);
    }

    addNewAvatar(avatar) {
        return fetch('', {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(this._check);
    }
}