import {$} from '@core/dom';

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target);
        $resizer.$el.classList.add('_fullDivider');

        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();
        const type = $resizer.data.resize;
        let value;

        $resizer.css({
            opacity: 1
        });


        document.onmousemove = e => {
            if (type === 'col') {
                const delta = Math.floor(e.pageX - coords.right);
                value = coords.width + delta;
                $resizer.css({right: -delta + 'px'});
            } else {
                const delta = Math.floor(e.pageY - coords.bottom);
                value = coords.height + delta;
                $resizer.css({bottom: -delta + 'px'});
            }
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            $resizer.css({
                opacity: 0
            });

            $resizer.$el.classList.remove('_fullDivider');

            if (type === 'col') {
                $parent.css({width: value + 'px'});
                $root.findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(el => el.style.width = value + 'px');
            } else {
                $parent.css({height: value + 'px'});
            }

            resolve({
                value,
                type,
                id: $parent.data[type]
            });

            $resizer.css({
                right: 0,
                bottom: 0
            });
        };
    });
}
