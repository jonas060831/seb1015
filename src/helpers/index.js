const randomNumberGenerator = (min, max) => {
    //i want to get a random number including min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    randomNumberGenerator
}