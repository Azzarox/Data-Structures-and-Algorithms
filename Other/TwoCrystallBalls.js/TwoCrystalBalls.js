const twoCrystalBalls = (arr) => {
    let jumpAmount = Math.floor(Math.sqrt(arr.length));

    let i = jumpAmount;

    for (; i < arr.length; i += jumpAmount) {
        if (arr[i]) {
            break;
        }
    }

    i -= jumpAmount;

    for (let j = 0; j <= jumpAmount && i < arr.length; j++, i++) {
        if (arr[i]) {
            return i;
        }
    }

    return -1;
};

module.exports = { twoCrystalBalls };
