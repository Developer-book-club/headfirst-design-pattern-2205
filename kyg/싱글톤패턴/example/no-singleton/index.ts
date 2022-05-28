import { Logger } from './Logger';
import { Payment } from './Payment';

const myLogger: Logger = new Logger(); // 로거 생성
myLogger.log('Starting the payment processor app.');
console.log('Log count: ' + myLogger.count.toString());

const myPayment: Payment = new Payment();
myPayment.process(100);
console.log('Log count: ' + myLogger.count.toString()); // 로그가 3번 출력되었지만, 1이 출력된다.
