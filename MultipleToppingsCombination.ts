abstract class DrinkBase {
  abstract fetchLabel(): string;
  abstract fetchPrice(): number;
}

class HerbalTea extends DrinkBase {
  fetchLabel(): string {
    return "Green Tea";
  }

  fetchPrice(): number {
    return 40;
  }
}

abstract class AddOnWrapper extends DrinkBase {
  protected coreDrink: DrinkBase;

  constructor(coreDrink: DrinkBase) {
    super();
    this.coreDrink = coreDrink;
  }
}

class Sweetener extends AddOnWrapper {
  fetchLabel(): string {
    return this.coreDrink.fetchLabel() + " + Sugar";
  }

  fetchPrice(): number {
    return this.coreDrink.fetchPrice() + 10;
  }
}

class Nectar extends AddOnWrapper {
  fetchLabel(): string {
    return this.coreDrink.fetchLabel() + " + Honey";
  }

  fetchPrice(): number {
    return this.coreDrink.fetchPrice() + 20;
  }
}


const finalCup = new Nectar(new Sweetener(new HerbalTea()));

console.log(finalCup.fetchLabel()); 
console.log(finalCup.fetchPrice()); 
