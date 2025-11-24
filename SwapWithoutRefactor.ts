class PetrolEngine {
  start(): void {
    console.log("Petrol engine started");
  }
}

class Car1 {
  engine: PetrolEngine = new PetrolEngine();

  drive(): void {
    this.engine.start();
    console.log("Driving car");
  }
}
