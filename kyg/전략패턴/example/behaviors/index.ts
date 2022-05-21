// fly
export interface FlyBehavior {
  fly(): void;
}

export class FlyWithWings implements FlyBehavior {
  fly(): void {
    console.log("파닥파닥");
  }
}

export class FlyNoWay implements FlyBehavior {
  fly(): void {
    console.log("가만히");
  }
}

// quack
export interface QuackBehavior {
  quack(): void;
}

export class Quack implements QuackBehavior {
  quack(): void {
    console.log("꽥");
  }
}

export class Squack implements QuackBehavior {
  quack(): void {
    console.log("삑삑");
  }
}

export class MuteQuack implements QuackBehavior {
  quack(): void {
    console.log("조용..");
  }
}
