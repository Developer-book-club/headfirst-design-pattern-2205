import {
  Pizza,
  KoreanPeperoniPizza,
  KoreanPineapplePizza,
  AmericanPeperoniPizza,
  AmericanPineapplePizza,
} from "../Pizza";

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
    if (type === "peperoni") return new KoreanPeperoniPizza();
    if (type === "pineapple") return new KoreanPineapplePizza();
  }
}

export class AmericanPizzaStore extends PizzaStore {
  createPizza(type: PizzaCategory): Pizza {
    if (type === "peperoni") return new AmericanPeperoniPizza();
    if (type === "pineapple") return new AmericanPineapplePizza();
  }
}
