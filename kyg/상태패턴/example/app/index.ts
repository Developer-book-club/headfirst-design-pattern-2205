import {
  FailState,
  InitState,
  LoadingState,
  State,
  SuccessState,
} from "../state";

export default class App {
  #initState: InitState;
  #loadingState: LoadingState;
  #successState: SuccessState;
  #failState: FailState;

  #state: State;

  constructor() {
    this.#initState = new InitState(this);
    this.#loadingState = new LoadingState(this);
    this.#successState = new SuccessState(this);
    this.#failState = new FailState(this);

    this.#state = this.#initState;
  }

  process() {
    this.#state.process();
  }

  showDisplay() {
    this.#state.showDisplay();
  }

  setState(state: State) {
    this.#state = state;
  }

  getInitState() {
    return this.#initState;
  }

  getLoadingState() {
    return this.#loadingState;
  }

  getSuccessState() {
    return this.#successState;
  }

  getFailState() {
    return this.#failState;
  }
}
