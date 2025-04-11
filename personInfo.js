function personInfo(){
    console.log(`Name: ${this.name}, Age: ${this.age}`);
}

let person={
    name:"Srishty",
    age:24
}

personInfo.call(person);