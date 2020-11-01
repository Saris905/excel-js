// утилита, для упрощения взаимодействия эл-в (по типу jquery), подключается внутри Excel допом

class Dom {
    constructor(selector) {
        this.$$listeners = {};
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this; // данная строка дает возможность вернуть clear через чейнинг(методы через точку в одну строку)
        }
        return this.$el.outerHTML.trim();
    }

    clear() {
        this.html('');
        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }

        return this; // опять же добавляем чтобы могли делать chain
    }

    get data() { // геттер
        return this.$el.dataset;
    }

    closest(selector) {
        return $(this.$el.closest(selector)); // оборачиваем как конструктор чтобы получить инстанс как у других методов
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(key => {
                this.$el.style[key] = styles[key]
            });
    }
}

export function $(selector) {
    return new Dom(selector);
}


$.create = (tagName, classes = '') => { // статический метод для ф-ии выше
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes)
    }
    return $(el);
};