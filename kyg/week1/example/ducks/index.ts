import {
  FlyBehavior,
  FlyNoWay,
  FlyWithWings,
  MuteQuack,
  Quack,
  QuackBehavior,
  Squack,
} from "../behaviors";

abstract class Duck {
  private flyBehavior: FlyBehavior;
  private quackBehavior: QuackBehavior;

  constructor({
    flyBehavior,
    quackBehavior,
  }: {
    flyBehavior: FlyBehavior;
    quackBehavior: QuackBehavior;
  }) {
    this.flyBehavior = flyBehavior;
    this.quackBehavior = quackBehavior;
  }

  abstract display(): void;

  setFlyBehavior(newFlyBehavior: FlyBehavior): void {
    this.flyBehavior = newFlyBehavior;
  }

  setQuackBehavior(newFlyBehavior: FlyBehavior): void {
    this.flyBehavior = newFlyBehavior;
  }

  swim(): void {
    console.log("수영수영");
  }

  performQuack(): void {
    this.quackBehavior.quack();
  }

  performFly(): void {
    this.flyBehavior.fly();
  }
}

export class MallardDuck extends Duck {
  constructor() {
    super({
      flyBehavior: new FlyWithWings(),
      quackBehavior: new Quack(),
    });
  }

  display(): void {
    console.log("물오리 모습");
  }
}

export class RedheadDuck extends Duck {
  constructor() {
    super({
      flyBehavior: new FlyWithWings(),
      quackBehavior: new Quack(),
    });
  }

  display(): void {
    console.log("붉은오리 모습");
  }
}

export class RubberDuck extends Duck {
  constructor() {
    super({
      flyBehavior: new FlyNoWay(),
      quackBehavior: new Squack(),
    });
  }

  display(): void {
    console.log("고무오리 모습");
  }
}

export class DecoyDuck extends Duck {
  constructor() {
    super({
      flyBehavior: new FlyNoWay(),
      quackBehavior: new MuteQuack(),
    });
  }

  display(): void {
    console.log("가짜오리 모습");
  }
}
