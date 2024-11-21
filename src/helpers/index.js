const randomNumberGenerator = (min, max) => {
    //i want to get a random number including min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const monthAndYearFromDateObject = (date) => {
    //return a string from the date given in this format MMM YYYY
    return date.toLocaleString('en-US', {month: 'short', year: 'numeric' })
}

module.exports = {
    randomNumberGenerator,
    monthAndYearFromDateObject
}