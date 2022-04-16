import { Action } from "actionhero";

export class RandomNumber extends Action {
  constructor() {
    super();
    this.name = "bismani";
    this.description = "I am an API method which will generate a random number";
    this.outputExample = { randomNumber: 0.1234 };
  }

  async run() {
    console.log("DOING RandomNumber");
    return { randomNumber: Math.random() };
  }
}
