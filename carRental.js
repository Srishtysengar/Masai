function Car(make, model, year, type, isAvailable = true) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.type = type;
  this.isAvailable = isAvailable;
}

function Customer(name) {
  this.name = name;
  this.rentedCars = [];
}

Customer.prototype.rentCar = function (car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(this.name + " rented " + car.make + " " + car.model);
  } else {
    console.log(car.make + " " + car.model + " is already rented.");
  }
};

Customer.prototype.returnCar = function (car) {
  setTimeout(() => {
    car.isAvailable = true;
    this.rentedCars = this.rentedCars.filter(c => c !== car);
    console.log(this.name + " returned " + car.make + " " + car.model);
  }, 2000);
};

function PremiumCustomer(name, discountRate) {
  Customer.call(this, name);
  this.discountRate = discountRate;
}

PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

function calculateRentalPrice(car, days, isPremium, discountRate = 0) {
  const baseRate = 50;
  let typeMultiplier = 1;

  switch (car.type) {
    case "SUV":
      typeMultiplier = 1.5;
      break;
    case "Sedan":
      typeMultiplier = 1.2;
      break;
    default:
      typeMultiplier = 1;
  }

  let price = baseRate * typeMultiplier * days;
  if (isPremium) {
    price -= price * discountRate;
  }
  return price;
}

function Maintenance(car, delay) {
  setTimeout(function () {
    car.isAvailable = true;
    console.log(car.make + " " + car.model + " is now available after maintenance.");
  }, delay);
}

const car1 = new Car("Toyota", "Corolla", 2020, "Sedan");
const car2 = new Car("Ford", "Explorer", 2021, "SUV");
const car3 = new Car("Honda", "Civic", 2022, "Sedan");

const customer1 = new Customer("Alice");
const premiumCustomer1 = new PremiumCustomer("Bob", 0.1);

customer1.rentCar(car1);
premiumCustomer1.rentCar(car2);

console.log("Rental price for Alice:", calculateRentalPrice(car1, 3, false));
console.log("Rental price for Bob:", calculateRentalPrice(car2, 3, true, premiumCustomer1.discountRate));

customer1.returnCar(car1);
premiumCustomer1.returnCar(car2);

Maintenance(car3, 3000);

const rentCarBound = customer1.rentCar.bind(premiumCustomer1);
rentCarBound(car3);

customer1.rentCar.call(premiumCustomer1, car3);
customer1.rentCar.apply(premiumCustomer1, [car3]);
