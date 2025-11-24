// Abstract Beverage class
abstract class Beverage2 {
  abstract getDescription(): string;
  abstract getCost(): number;
}

// Concrete Beverage
class GreenTea2 extends Beverage2 {
  getDescription(): string {
    return "Green Tea";
  }

  getCost(): number {
    return 40;
  }
}


abstract class BeverageDecorator1 extends Beverage2 {
  protected drink: Beverage2;

  constructor(drink: Beverage2) {
    super();
    this.drink = drink;
  }
}

class Sugar1 extends BeverageDecorator1 {
  getDescription(): string {
    return this.drink.getDescription() + " + Sugar";
  }

  getCost(): number {
    return this.drink.getCost() + 10;
  }
}

const myTea = new Sugar1(new Sugar1(new GreenTea2()));

console.log(myTea.getDescription()); 
console.log(myTea.getCost());        
