function filterEvenNumbers(arr){
    return arr.filter(num=>num%2 === 0);
}

function sumOfArray(arr){
    return arr.reduce((acc,curr)=> acc+curr, 0);
}

function sortAndConcate(arr1, arr2){
    let sortedArr1=[...arr1].sort((a, b)=>a-b);
    let sortedArr2=[...arr2].sort((a, b)=>a-b);
    return sortedArr1.concat(sortedArr2);
}

let array1=[10, 3, 5, 8, 2];
let array2=[7, 6, 4, 1, 9];

let evenNumbers1=filterEvenNumbers(array1);
let evenNumbers2=filterEvenNumbers(array2);

let sum1=sumOfArray(array1);
let sum2=sumOfArray(array2);

let combinedSortedArray = sortAndConcate(array1, array2);

console.log('Even Numbers of Array 1', evenNumbers1);
console.log('Even Numbers of Array 2', evenNumbers2);
console.log('Sum of Array 1', sum1);
console.log('Sum of Array 2', sum2);
console.log('Sorted and Concatenated Array', combinedSortedArray);

