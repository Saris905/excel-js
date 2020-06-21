import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners); // в DOMListener передаем только часть параметров
        this.name = options.name;
    }

    // возвращает шаблон комопнента
    toHTML() {
        return '';
    }

    init() {
        this.initDomListeners();
    }

    destroy() {
        this.removeDOMListeners();
    }
}
