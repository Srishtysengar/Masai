function extractAndArray(arr){
    let subArray=arr.slice(3,5);
    let reverseArray=subArray.reverse();

    return reverseArray;
}

let originalArray=[15, 30, 45, 60,75, 90];
let result=extractAndArray(originalArray);

console.log('original Array', originalArray);
console.log('Reversed Array', result);