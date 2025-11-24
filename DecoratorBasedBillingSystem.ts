abstract class DrinkBaseUnit {
  abstract details(): string;
  abstract total(): number;
}

class ShotEspresso extends DrinkBaseUnit {
  details(): string {
    return "Espresso";
  }

  total(): number {
    return 80;
  }
}

class ZestyLemonTea extends DrinkBaseUnit {
  details(): string {
    return "LemonTea";
  }

  total(): number {
    return 40;
  }
}

abstract class AddLayer extends DrinkBaseUnit {
  protected core: DrinkBaseUnit;

  constructor(core: DrinkBaseUnit) {
    super();
    this.core = core;
  }
}

class CrystalSweetener extends AddLayer {
  details(): string {
    return this.core.details() + " + Sugar";
  }

  total(): number {
    return this.core.total() + 10;
  }
}

class GoldenHoneyMix extends AddLayer {
  details(): string {
    return this.core.details() + " + Honey";
  }

  total(): number {
    return this.core.total() + 20;
  }
}

class CreamyWhipLayer extends AddLayer {
  details(): string {
    return this.core.details() + " + WhippedCream";
  }

  total(): number {
    return this.core.total() + 15;
  }
}

const firstOrder = new GoldenHoneyMix(new CreamyWhipLayer(new ShotEspresso()));
const secondOrder = new CrystalSweetener(new CrystalSweetener(new ZestyLemonTea()));

console.log("Order 1:", firstOrder.details()); 
console.log("Cost 1: ₹", firstOrder.total());    

console.log("Order 2:", secondOrder.details()); 
console.log("Cost 2: ₹", secondOrder.total());  
