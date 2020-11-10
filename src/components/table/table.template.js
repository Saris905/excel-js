const CODES = {
    A: 65,
    Z: 90
};

function toCell(row) {
    return function(_, col) {
        return `
        <div class="cell" 
            contenteditable 
            data-id="${row}:${col}" 
            data-type="cell"
            data-col="${col}">      
        </div>
    `;
    };
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(index, content) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
    <div class="row" data-type="resizable" data-row="${index}">
        <div class="row-info">
            ${index ? index : ''}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) { // используем плейсхолдер _, чтобы получить доступ до индекса(так как map автоматом нам передает el)
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar) // передача ф-ий как референсов!
        .map(toColumn)
        .join('');

    rows.push(createRow(null, cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, col) => toCell(row, col))
            .map(toCell(row))
            .join('');

        rows.push(createRow(row + 1, cells));
    }

    return rows.join('');
}
