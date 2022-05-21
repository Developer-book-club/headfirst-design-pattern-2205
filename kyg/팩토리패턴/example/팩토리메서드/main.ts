import { KoreanPizzaStore, AmericanPizzaStore } from "./PizzaStore";

const koreanPizzaStore = new KoreanPizzaStore();
const americanPizzaStore = new AmericanPizzaStore();

const koreaPeperoniPizza = koreanPizzaStore.orderPizza("peperoni");
const koreaPineapplePizza = koreanPizzaStore.orderPizza("pineapple");

console.log(koreaPeperoniPizza.getName());
console.log(koreaPineapplePizza.getName());

const amreicanPeperoniPizza = americanPizzaStore.createPizza("peperoni");
const amreicanPineapplePizza = americanPizzaStore.createPizza("pineapple");
console.log(amreicanPeperoniPizza.getName());
console.log(amreicanPineapplePizza.getName());
