
export function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}
export function getIntRandomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}