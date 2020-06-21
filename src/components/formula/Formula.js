import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'; // изучить вопрос статики

    constructor($root) {
        super($root, {
            name: 'Formula', // обяз имя для компонента чтобы обр. ошибки
            listeners: ['input', 'click']
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }

    onInput(event) {
        console.log('Formula: onInput', event.target.textContent.trim());
        console.log(this.$root);
    }

    onClick(event) {
        console.log('click');
    }
}
