export default class Userinfo {
    constructor({ usernameSelector, descriptionSelector, useravatarSelector }) {
        this._username = document.querySelector(usernameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._useravatar = document.querySelector(useravatarSelector);
    }

    getUserInfo() {
        return {
            username: this._username.textContent,
            description: this._description.textContent
        };
    }

    setUserInfo(item) {
        this._username.textContent = item.name;
        this._description.textContent = item.about;
        this._useravatar.src = item.avatar
    }
}