import { Logger } from './Logger';

export class Payment {
  #paymentLogger: Logger = new Logger(); // 로거 생성: 새로운 인스턴스를 생성한다.

  constructor() {
    this.#paymentLogger.log('payment instance constructed');
  }

  public process(amount: number) {
    this.#paymentLogger.log('processing payment: ' + amount.toString());
  }
}
