import App from "../app";

/**
* 상태 종류
1. init 초기화
2. loading 로딩 
3. success 성공
4. fail 실패
 */
export interface State {
  process(): void;
  showDisplay(): void;
}

export class InitState implements State {
  #app: App;

  constructor(app: App) {
    this.#app = app;
  }
  process(): void {
    console.log("초기화중..");

    this.#app.setState(this.#app.getLoadingState());
  }
  showDisplay(): void {
    console.log("초기화 화면 보여주기");
  }
}

export class LoadingState implements State {
  #app: App;

  constructor(app: App) {
    this.#app = app;
  }
  process(): void {
    console.log("로딩중..");

    if(...){
       this.#app.setState(this.#app.getSuccessState());
    }else {
       this.#app.setState(this.#app.getFailState());
    }
  }
  showDisplay(): void {
    console.log("데이터 로딩중 화면 보여주기");
  }
}

export class SuccessState implements State {
  #app: App;

  constructor(app: App) {
    this.#app = app;
  }
  process(): void {
    // noop
  }
  showDisplay(): void {
    console.log("로딩 성공 화면 보여주기");
  }
}

export class FailState implements State {
  #app: App;

  constructor(app: App) {
    this.#app = app;
  }
  process(): void {
    // noop
  }
  showDisplay(): void {
    console.log("로딩 실패 화면 보여주기");
  }
}
