/**
 * The function will return a random range from the values
 * @param {number} min - minimum value of the range of number
 * @param {number} max  - maximum value of the range of number
 * @returns a random range from the values
 */
export function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * The function will return an integer of a random value from the range as specified
 * @param {number} min - minimum value of the range of number
 * @param {number} max  - maximum value of the range of number
 * @returns an integer of a random value from the range as specified
 */
export function getIntRandomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}