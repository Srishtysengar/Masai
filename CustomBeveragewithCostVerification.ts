abstract class DrinkUnit {
  abstract info(): string;
  abstract amount(): number;
}

class DarkRoast extends DrinkUnit {
  info(): string {
    return "Coffee";
  }

  amount(): number {
    return 50;
  }
}

abstract class LayerAddon extends DrinkUnit {
  protected baseLayer: DrinkUnit;

  constructor(baseLayer: DrinkUnit) {
    super();
    this.baseLayer = baseLayer;
  }
}

class SweetCrystals extends LayerAddon {
  info(): string {
    return this.baseLayer.info() + " + Sugar";
  }

  amount(): number {
    return this.baseLayer.amount() + 10;
  }
}

class AmberDrop extends LayerAddon {
  info(): string {
    return this.baseLayer.info() + " + Honey";
  }

  amount(): number {
    return this.baseLayer.amount() + 20;
  }
}

class CloudFrost extends LayerAddon {
  info(): string {
    return this.baseLayer.info() + " + WhippedCream";
  }

  amount(): number {
    return this.baseLayer.amount() + 15;
  }
}

const finalBlend = new CloudFrost(new AmberDrop(new SweetCrystals(new DarkRoast())));

console.log(finalBlend.info());   
console.log(finalBlend.amount()); 
