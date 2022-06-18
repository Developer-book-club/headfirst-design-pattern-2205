import { Person } from "../Subject";

export class OwnerProxyHandler implements ProxyHandler<Person> {
  set(target: Person, key: string, val: unknown) {
    if (key === "score") {
      throw Error("자기 자신에게 점수를 줄 수 없습니다.");
    }

    return Reflect.set(target, key, val);
  }
}

export class NonOwnerProxyHandler implements ProxyHandler<Person> {
  set(target: Person, key: string, val: unknown) {
    return Reflect.set(target, key, val);
  }
}
