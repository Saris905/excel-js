import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners); // в DOMListener передаем только часть параметров
        this.name = options.name;
        this.emitter = options.emitter;
        this.unsubscribers = [];
        this.prepare()
    }

    // Настраиваем наш компонент до init
    prepare() {}

    // возвращает шаблон комопнента
    toHTML() {
        return '';
    }

    // Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подпсиываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    // инициализируем компонент и добавляем ДОМ слушателей
    init() {
        this.initDomListeners();
    }

    // Удаляем компонент и чистим слушатели
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub());
    }
}
