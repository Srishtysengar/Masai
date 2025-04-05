function outerFunction(){
    let message="Hello Closure's";

    return function(){
        console.log(message);
    }
}
const innerFunc = outerFunction();
innerFunc();