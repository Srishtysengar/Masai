function multiplyNumbers(a, b){
    let multiplier={
        product: function(x,y){
            return x*y;
        }
    }
    return multiplier.product.apply(null, [a,b]);

}
console.log(multiplyNumbers(5,3));
