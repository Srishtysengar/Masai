let num=971;

function reversedNumber(n){
    let temp=0;
    while(n>0){
        let digit = n%10;
        temp = temp*10 + digit;
        n = Math.floor(n/10);
    }
    return temp;
}

console.log(reversedNumber(num));