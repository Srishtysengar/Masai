interface TransportMode {
  ignite(): void;
}


class Scooter implements TransportMode {
  ignite(): void {
    console.log("Scooter is starting");
  }
}

class Sedan implements TransportMode {
  ignite(): void {
    console.log("Sedan is starting");
  }
}

class Navigator2 {
  private currentMode: TransportMode;

  constructor(mode: TransportMode) {
    this.currentMode = mode;
  }

  travel(): void {
    this.currentMode.ignite();
    console.log("Moving ahead...");
  }

  updateMode(newMode: TransportMode): void {
    this.currentMode = newMode;
  }
}


const pathFinder = new Navigator2(new Scooter());
pathFinder.travel();   

pathFinder.updateMode(new Sedan());
pathFinder.travel();  
