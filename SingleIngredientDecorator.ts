abstract class Beverage1 {
  abstract getDescription(): string;
  abstract getCost(): number;
}


class GreenTea1 extends Beverage1 {
  getDescription(): string {
    return "Green Tea";
  }

  getCost(): number {
    return 40;
  }
}

abstract class BeverageDecorator extends Beverage1 {
  protected beverage: Beverage1;

  constructor(beverage: Beverage1) {
    super();
    this.beverage = beverage;
  }
}

class Sugar extends BeverageDecorator {
  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }

  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}


const tea1 = new Sugar(new GreenTea1());
console.log(tea1.getDescription()); 
console.log(tea1.getCost());      
