export default class Userinfo {
    constructor({ usernameSelector, descriptionSelector }) {
        this._username = document.querySelector(usernameSelector);
        this._description = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        return {
            username: this._username.textContent,
            description: this._description.textContent
        };
    }

    setUserInfo(username, description) {
        debugger
        this._username.textContent = username;
        this._description.textContent = description;
    }
}