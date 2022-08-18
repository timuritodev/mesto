export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem() {
        this._container.prepend(item);
    }

    renderItems() {
        this._items.forEach((data) => {
            this.addItem(this._renderer(data));
        })
    }
}