export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._container.prepend(item);
    }

    renderItems(items) {
        this._items = items;
        this._items.forEach((data) => {
            this._renderer(data);
        })
    }
}