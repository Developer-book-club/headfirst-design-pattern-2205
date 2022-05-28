import {
  ChedaCheese,
  Cheese,
  Dough,
  HotSauce,
  MozzaCheese,
  Sauce,
  ThickDough,
  ThinDough,
  TomatoSauce,
} from "./indegredients";

// 제품군을 생성하는 팩토리 인터페이스
export interface IndegredientFactory {
  createDough(): Dough;
  createSauce(): Sauce;
  createCheese(): Cheese;
}

// 각각 자기 지역에 맞게 제품군 형성
export class KoreaIndegredientFactory implements IndegredientFactory {
  createDough(): Dough {
    return new ThinDough();
  }

  createCheese(): Cheese {
    return new ChedaCheese();
  }

  createSauce(): Sauce {
    return new HotSauce();
  }
}

// 각각 자기 지역에 맞게 제품군 형성
export class AmericanIndegredientFactory implements IndegredientFactory {
  createDough(): Dough {
    return new ThickDough();
  }

  createCheese(): Cheese {
    return new MozzaCheese();
  }

  createSauce(): Sauce {
    return new TomatoSauce();
  }
}
