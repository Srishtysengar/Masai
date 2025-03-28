let k = 25;

function sumOfSquareNumber(k) {
    for (let a = 0; a * a <= k; a++) {
        let b = Math.sqrt(k - a * a);
        if (b === Math.floor(b)) {
            return true;
        }
    }
    return false;
}

console.log(sumOfSquareNumber(k));