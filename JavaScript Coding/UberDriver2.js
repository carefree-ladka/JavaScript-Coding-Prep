class UberDriver {
  constructor() {
    console.log("Hello uber driver is online");
    this.queue = Promise.resolve();
  }

  pick(user) {
    this.queue = this.queue.then(() => {
      console.log(`User ${user} is picked`);
    });
    return this;
  }

  drive(seconds) {
    this.queue = this.queue.then(() => {
      console.log("Driver is driving");
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    });
    return this;
  }

  drop(user) {
    this.queue = this.queue.then(() => {
      console.log(`Drop ${user}`);
    });
    return this;
  }

  rest(seconds) {
    this.queue = this.queue
      .then(() => {
        return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
      })
      .then(() => {
        console.log("Driver is in offline mode");
      });
    return this;
  }
}
