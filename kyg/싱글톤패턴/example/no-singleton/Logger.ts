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
