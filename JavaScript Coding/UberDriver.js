class UberDriver {
  constructor() {
    console.log("Hello uber driver is online");
    this.passengers = [];
  }

  pick(user) {
    console.log(`User ${user} is picked`);
    this.passengers.push(user);
    return this;
  }

  drive(seconds) {
    console.log("Driver is driving");
    return new Promise((resolve) => {
      setTimeout(() => resolve(this), seconds * 1000);
    });
  }

  drop(user) {
    console.log(`Drop ${user}`);
    this.passengers = this.passengers.filter((p) => p !== user);
    return this;
  }

  rest(seconds) {
    console.log("Driver is in offline mode");
    return new Promise((resolve) => {
      setTimeout(() => resolve(this), seconds * 1000);
    });
  }
}

// Usage example (async/await version)
async function runUberDriver() {
  await new UberDriver()
    .pick("TestUser")
    .pick("Rahul")
    .drive(2)
    .then((driver) => driver.drop("Rahul"))
    .then((driver) => driver.drive(4))
    .then((driver) => driver.drop("TestUser"))
    .then((driver) => driver.rest(10));
}

// Run the example
runUberDriver();
