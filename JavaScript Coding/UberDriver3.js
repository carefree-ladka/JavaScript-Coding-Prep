const EventEmitter = require("events");

class UberDriver extends EventEmitter {
  constructor() {
    super();
    console.log("Hello uber driver is online");
    this.#registerEvents();
  }

  #wait(sec) {
    return new Promise((res) => setTimeout(res, sec * 1000));
  }

  #registerEvents() {
    this.on("pick", (user) => console.log(`User ${user} is picked`));
    this.on("drop", (user) => console.log(`Drop ${user}`));
    this.on("drive", () => console.log("Driver is driving"));
    this.on("rest", () => console.log("Driver is in offline mode"));
  }

  async pick(user) {
    this.emit("pick", user);
    return this;
  }

  async drive(seconds) {
    this.emit("drive");
    await this.#wait(seconds);
    return this;
  }

  async drop(user) {
    this.emit("drop", user);
    return this;
  }

  async rest(seconds) {
    await this.#wait(seconds);
    this.emit("rest");
    return this;
  }
}
