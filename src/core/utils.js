// Pure functions (не взаимодействуют с какими-то глобальными переменными, только с входящими параметрами)
export function capitalize(string = '') {
    if (typeof string !== 'string') {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}
