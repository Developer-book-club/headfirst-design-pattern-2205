export interface Person {
  name: string;
  score: number;

  setScore(score: number): void;
}

export class PersonImpl implements Person {
  name: string;
  score: number;

  constructor(name: string) {
    this.name = name;
    this.score = 0;
  }

  setScore(score: number): void {
    this.score = score;
  }
}
