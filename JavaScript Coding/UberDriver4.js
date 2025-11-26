class UberDriver {
  constructor() {
    console.log("Hello uber driver is online");
    this.jobs = [];
    this.running = false;
  }

  #wait(sec) {
    return new Promise((res) => setTimeout(res, sec * 1000));
  }

  #addJob(fn) {
    this.jobs.push(fn);

    if (!this.running) {
      this.running = true;
      this.#run();
    }

    return this;
  }

  async #run() {
    while (this.jobs.length) {
      const job = this.jobs.shift();
      await job();
    }
    this.running = false;
  }

  pick(user) {
    return this.#addJob(async () => {
      console.log(`User ${user} is picked`);
    });
  }

  drive(seconds) {
    return this.#addJob(async () => {
      console.log("Driver is driving");
      await this.#wait(seconds);
    });
  }

  drop(user) {
    return this.#addJob(async () => {
      console.log(`Drop ${user}`);
    });
  }

  rest(seconds) {
    return this.#addJob(async () => {
      await this.#wait(seconds);
      console.log("Driver is in offline mode");
    });
  }
}
