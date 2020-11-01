import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) { // root это корневой эл-т, в котором раскрывается компонент
            throw new Error('No $root provided for DomListener');
        }
        this.$root = $root;
        this.listeners = listeners
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            if (!this[method]) {
                const name = this.name || '';
                throw new Error(`Method ${method} is not implemented in ${name} Component`);
            }
            this[method] = this[method].bind(this); // куда бы мы его не передали, всегда будет с контекстом
            this.$root.on(listener, this[method]); // без bind контекст теряется(внутри колбэка можем потерять втроенные ф-ии)
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        })
    }
}

// приватная функция для данного модуля
function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
