import { IndegredientFactory } from "../Indegredients";
import {
  ChedaCheese,
  Cheese,
  Dough,
  Sauce,
  TomatoSauce,
} from "../Indegredients/indegredients";

export abstract class Pizza {
  private dough: Dough;
  private sauce: Sauce;
  private cheese: Cheese;

  protected indegredientFactory: IndegredientFactory;

  constructor({
    indegredientFactory,
  }: {
    indegredientFactory: IndegredientFactory;
  }) {
    this.indegredientFactory = indegredientFactory;
  }

  prepare(): void {
    console.log("피자 준비");
    this.dough = this.indegredientFactory.createDough();
    this.cheese = this.indegredientFactory.createCheese();
    this.sauce = this.indegredientFactory.createSauce();
  }
  bake(): void {
    console.log("피자 굽기");
  }
  cut(): void {
    console.log("피자 자르기");
  }
  box(): void {
    console.log("피자 박싱");
  }
}

export class PeperoniPizza extends Pizza {
  constructor(indegredientFactory: IndegredientFactory) {
    super({ indegredientFactory });
  }
}

export class PineapplePizza extends Pizza {
  constructor(indegredientFactory: IndegredientFactory) {
    super({ indegredientFactory });
  }
}
