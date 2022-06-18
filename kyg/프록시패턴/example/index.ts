import { Person, PersonImpl } from "./Subject";
import { NonOwnerProxyHandler, OwnerProxyHandler } from "./Handlers";

const chulSoo = new PersonImpl("철수");

const ownProxy = new Proxy<Person>(chulSoo, new OwnerProxyHandler());
const nonOwnProxy = new Proxy<Person>(chulSoo, new NonOwnerProxyHandler());

// ownProxy.setScore(123213); // error
nonOwnProxy.setScore(123213);
