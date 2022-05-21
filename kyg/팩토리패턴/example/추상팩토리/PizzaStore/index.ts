import {
  IndegredientFactory,
  KoreaIndegredientFactory,
  AmericanIndegredientFactory,
} from "../Indegredients";
import { PeperoniPizza, PineapplePizza, Pizza } from "../Pizza";

export type PizzaCategory = "peperoni" | "pineapple";

abstract class PizzaStore {
  orderPizza(type: PizzaCategory): Pizza {
    const pizza: Pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  protected abstract createPizza(type: PizzaCategory): Pizza;
}

export class KoreanPizzaStore extends PizzaStore {
  createPizza(type: PizzaCategory): Pizza {
    // KoreanPizza와 연관된 제품군만 생성하는 팩토리
    // 어떤 제품군에 필요한것들만 팩토리를 만들어
    const indegredientFactory: IndegredientFactory =
      new KoreaIndegredientFactory();

    if (type === "peperoni") return new PeperoniPizza(indegredientFactory);
    if (type === "pineapple") return new PineapplePizza(indegredientFactory);
  }
}

export class AmericanPizzaStore extends PizzaStore {
  createPizza(type: PizzaCategory): Pizza {
    const indegredientFactory: IndegredientFactory =
      new AmericanIndegredientFactory();

    if (type === "peperoni") return new PeperoniPizza(indegredientFactory);
    if (type === "pineapple") return new PineapplePizza(indegredientFactory);
  }
}
