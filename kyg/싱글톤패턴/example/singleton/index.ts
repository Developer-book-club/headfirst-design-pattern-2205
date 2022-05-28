import { Logger, LoggerSingleton } from './Logger';
import { Payment } from './Payment';

const myLogger: Logger = LoggerSingleton.getInstance();
myLogger.log('Starting the payment processor app.');
console.log('Log count: ' + myLogger.count.toString());

const myPayment: Payment = new Payment();
myPayment.process(100);
console.log('Log count: ' + myLogger.count.toString()); // 3이 출력된다.
