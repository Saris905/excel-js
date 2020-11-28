import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
// внутри данного файла происходит запуск приложения

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.store = options.store;
        this.emitter = new Emitter();
        this.subscriber = new StoreSubscriber(this.store);
    }

    render() {
        this.$el.append(this.getRoot());

        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init()); // для каждого компонента запускаем инит слушателей, обязательно после отрисовки
    }

    getRoot() {
        const $root = $.create('div', 'excel');

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        };

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el, componentOptions);

            if (component.name) {
                window['c' + component.name] = component;
            }

            $el.html(component.toHTML());
            $root.append($el);

            return component;
        });
        return $root;
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach(component => component.destroy());
    }
}
