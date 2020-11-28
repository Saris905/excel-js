function toButton(button) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'
    `;
    return `
        <div class="button ${button.action ? 'active' : ''}">
            <i class="material-icons"
                ${meta}>
                ${button.icon}
            </i>
        </div>
    `;
}

export function createToolbar(state) {
    const buttons = [
        {
            icon: 'format_align_left',
            action: state['textAlign'] === 'left',
            value: {
                textAlign: state['textAlign'] === 'left' ? 'none' : 'left'
            }
        },
        {
            icon: 'format_align_center',
            action: state['textAlign'] === 'center',
            value: {
                textAlign: state['textAlign'] === 'center' ? 'none' : 'center'
            }
        },
        {
            icon: 'format_align_right',
            action: state['textAlign'] === 'right',
            value: {
                textAlign: state['textAlign'] === 'right' ? 'none' : 'right'
            }
        },
        {
            icon: 'format_bold',
            action: state['fontWeight'] === 'bold',
            value: {
                fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'
            }
        },
        {
            icon: 'format_italic',
            action: state['fontStyle'] === 'italic',
            value: {
                fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'
            }
        },
        {
            icon: 'format_underline',
            action: state['textDecoration'] === 'underline',
            value: {
                textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'
            }
        }
    ];
    return buttons.map(toButton).join('')
}
