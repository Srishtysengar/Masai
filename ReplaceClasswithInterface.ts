// Interface replacing direct class dependency
interface IMachine {
  ignite(): void;
}

// Car implementing IMachine
class RoadCar implements IMachine {
  ignite(): void {
    console.log("Car is starting");
  }
}

// Bike implementing IMachine
class SpeedBike implements IMachine {
  ignite(): void {
    console.log("Bike is starting");
  }
}

// Driver depends on IMachine, NOT on a concrete class
class Navigator1 {
  private transport: IMachine;

  constructor(transport: IMachine) {
    this.transport = transport;   // Loose coupling
  }

  move(): void {
    this.transport.ignite();
    console.log("Driving...");
  }
}


const tripOne = new Navigator1(new RoadCar());
tripOne.move();

const tripTwo = new Navigator1(new SpeedBike());
tripTwo.move();
