export abstract class Pizza {
  private name: string;

  constructor({ name }: { name: string }) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  prepare(): void {
    console.log("피자 준비");
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

export class KoreanPeperoniPizza extends Pizza {
  constructor() {
    super({ name: "한국식 페페로니 피자" });
  }
}

export class KoreanPineapplePizza extends Pizza {
  constructor() {
    super({ name: "한국식 파인애플 피자" });
  }
}

export class AmericanPeperoniPizza extends Pizza {
  constructor() {
    super({ name: "미국식 페페로니 피자" });
  }
}

export class AmericanPineapplePizza extends Pizza {
  constructor() {
    super({ name: "미국식 파인애플 피자" });
  }
}
