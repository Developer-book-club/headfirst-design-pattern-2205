import { FlyWithWings } from "./behaviors";
import { RubberDuck } from "./ducks";

const rubberDuck = new RubberDuck();

rubberDuck.performFly();
rubberDuck.performQuack();

rubberDuck.setFlyBehavior(new FlyWithWings());
