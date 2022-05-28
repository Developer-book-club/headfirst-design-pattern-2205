# 싱글톤

**특정 클래스에 객체 인스턴스가 하나만 만들어지도록 해 주는 패턴**

## Why

싱글톤은 유일한 객체 인스턴스를 만들어야 하는 경우에 주로 사용된다.
-> 앱 전체에 공유할 상태를 저장하는 용도로 사용한다.

인스턴스를 초기화할 때나 데이터를 변경할 때, 싱글톤 객체가 앱 전반으로 영향 끼침을 의미한다.

싱글톤 객체를 사용하는 앱 전반으로 영향을 끼치기 때문에, 전역상태와 많이 비교된다.

---

## Example

<details><summary>로깅 예제</summary>

### no-singleton

```ts
//Logger.ts
interface Log {
  message: string;
  timestamp: string;
}

export class Logger {
  #logs: Log[] = [];

  constructor() {}

  get count(): number {
    return this.#logs.length;
  }

  log(message: string) {
    const timestamp: string = new Date().toISOString();

    this.#logs.push({ message, timestamp });
    console.log(`${timestamp} - ${message}`);
  }
}
```

```ts
//Payment.ts
import { Logger } from "./Logger";

export class Payment {
  #paymentLogger: Logger = new Logger(); // 로거 생성: 새로운 인스턴스를 생성한다.

  constructor() {
    this.#paymentLogger.log("payment instance constructed");
  }

  public process(amount: number) {
    this.#paymentLogger.log("processing payment: " + amount.toString());
  }
}
```

```ts
//index.ts
import { Logger } from "./Logger";
import { Payment } from "./Payment";

const myLogger: Logger = new Logger(); // 로거 생성
myLogger.log("Starting the payment processor app.");
console.log("Log count: " + myLogger.count.toString());

const myPayment: Payment = new Payment();
myPayment.process(100);
console.log("Log count: " + myLogger.count.toString()); // 로그가 3번 출력되었지만, 1이 출력된다.
```

### singleton

```ts
// Logger.ts
interface Log {
  message: string;
  timestamp: string;
}

export class Logger {
  #logs: Log[] = [];

  constructor() {}

  get count(): number {
    return this.#logs.length;
  }

  log(message: string) {
    const timestamp: string = new Date().toISOString();

    this.#logs.push({ message, timestamp });
    console.log(`${timestamp} - ${message}`);
  }
}

// 싱글톤 클래스
export class LoggerSingleton {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!LoggerSingleton.instance) {
      LoggerSingleton.instance = new Logger();
    }
    return LoggerSingleton.instance;
  }
}
```

```ts
import { Logger, LoggerSingleton } from "./Logger";

export class Payment {
  #paymentLogger: Logger = LoggerSingleton.getInstance(); // 싱글톤에서 인스턴스 get

  constructor() {
    this.#paymentLogger.log("payment instance constructed");
  }

  public process(amount: number) {
    this.#paymentLogger.log("processing payment: " + amount.toString());
  }
}
```

```ts
//index.ts
import { Logger, LoggerSingleton } from "./Logger";
import { Payment } from "./Payment";

const myLogger: Logger = LoggerSingleton.getInstance();
myLogger.log("Starting the payment processor app.");
console.log("Log count: " + myLogger.count.toString());

const myPayment: Payment = new Payment();
myPayment.process(100);
console.log("Log count: " + myLogger.count.toString()); // 3이 출력된다.
```

</details>

---

## Global behavior

Singleton 인스턴스는 전체 앱에서 액세스 가능하다. 싱글톤의 일반적인 사례는 앱 전체에서 일종의 글로벌 상태를 갖는 것.

코드베이스 여러 부분에서 데이터 수정/삭제가 가능하고 이런 동작은 같은 가변상태(mutable state)에 예기치 않은 동작으로 이어질 가능성이 높다.

그래서 behavior 실행 순서가 중요해지는데, 이 역시 프로젝트가 커져 여러 구성요소가 얽히게 되면 data-flow를 파악하기 힘들어 진다.

### State management in React

React에서는 전역관리 상태도구로 Redux, Context API가 주로 사용되는데, 이 도구들의 전역 행동(global behavior)들이 싱글톤과 유사해보인다. 하지만, 이 툴들은 싱글톤의 가변상태(mutable state)보다는 읽기전용 상태(read-only state)만 제공한다. 이런 상태 관리툴에 Flux패턴을 더해 순수함수 형태의 reducer만이 상태를 업데이트 할 수 도록 data-flow 순서를 한 방향으로 제약을 둔 특징이 더 있다. (vs recoil, jotai)

---

## ETC

- https://blog.logrocket.com/youre-wrong-about-singletons/ (싱글턴 안티패턴 논쟁 부분을 DI로 해결하는 블로그 POST)
