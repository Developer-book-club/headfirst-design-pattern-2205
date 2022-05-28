import { Logger, LoggerSingleton } from './Logger';

export class Payment {
  #paymentLogger: Logger = LoggerSingleton.getInstance(); // 싱글톤에서 인스턴스 get

  constructor() {
    this.#paymentLogger.log('payment instance constructed');
  }

  public process(amount: number) {
    this.#paymentLogger.log('processing payment: ' + amount.toString());
  }
}
