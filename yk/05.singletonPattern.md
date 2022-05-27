

# singleton 패턴이란?

- 목적 : 해당 클래스의 인스턴스가 하나만 만들어지고, 어디서든지 그 인스턴스에 접근할 수 있도록 하기 위한 패턴
### 우선 개발을 하면서 오직 하나의 객체만 필요하거나 있어야하는 경우가 있을까요?
- -> thread pools, caches, dialog boxes, objects that handle preferences and registry settings, objects used for logging, and objects that act as device drivers to devices like printers and graphics cards 이런것들은 하나의 객체만 있어야합니다. 둘 이상의 객체가 존재할경우, 리소스가 낭비되고 프로그램이 잘못 동작하거나 결과가 일관성있게 나오지 않을 수 있습니다.
## solving problem 
### 1. wrong way
- singleton의 목표를 달성하기 위해 global variable을 이용하면 어떨까요?
- downside
  - 1. 만약 `global object`를 만들었다고 가정하겠습니다. 이 `global object`는 application이 실행할때 선언될것입니다. 다만 이 oject는 생성됐다고 하더라고 사용이 되지 않을수 있기 때문에 메모리가 낭비됩니다.
  - 2. 또하나, `global object`가 두개 이상의 인스턴스가 되지 않게 하기 위해서는 어떻게 해야할수있을까요? → 이에 따른 명확한 방법이 없습니다. 즉  `global object` 로는   “클래스의 인스턴스가 하나만 존재하고 글로벌 액세스를 제공하는 것” 이라는 singleton패턴의 목적에서 첫번째 조건을 보장할수없습니다.
- -> 실제로 singleton pattern에서 static을 사용해서 구현합니다. 그러나 `static variable` 만 사용하는것보다 클래스를 통해서 더 정확하고 확실하게 언제든지 only one을 보장합니다.

> *java에서 global variable은 static으로 구현할수있습니다.
> ```java
>    public class Example {
>     public static int a;
>     public static int b;
>    }
>   ```

### 2. good way - static method with class
- 사용할때 instance를 선언해서 쓰지 않고 class를 call해서 쓰는것이기 때문에 어디서든 쉽게 접근 가능합니다.
- 클래스로 되어있어서 단순히 global 변수만 쉽게 접근하는것 뿐만 아니라, 이 global 변수에 행동을 취할수있는 method 와 data등도 쉽게 접근할수 있습니다.
  
    ```java
    // 1. implement with class
    class Singleton {
        static Singleton singletonInstance;
        private Singleton(){}
        static getInstance(){
            if(singletonInstance === null){
                singletonInstance = new Singleton()
            return singletonInstance
            }
        }   
    }
    public class SingletonClient {
        public static void main(String args[]){
        unique = Singleton.getInstance()
            
        }
    }
    ```

#### example
##### chocolateBoiler 구축 

```java
    public class ChocolateBoiler{
        static ChocolateBoiler uniqueInstance;

        private boolean empty;
        private boolean boiled;


        private ChocolateBoiler(){
            empty=true;
            boiled=false
        };
        public static ChocolateBoiler getInstance(){
            if(uniqueInstance == null){
                uniqueInstance = new ChocolateBoiler();
            }
            return uniqueInstance
        }

        public void fill(){
            if(isEmpty()){
                // fill the boiler with a milk/chocolate mixture
                empty=false;
                boiled=false;
            }
        }

        public void drain(){
            if(!isEmpty () && isBoiled()){
            // drain the boiled milk and chocolate
            empty=true;
            }
        }

        public void boil(){
            if(!isEmpty () && !isBoiled()){
                // bring the contents to a boil
                boiled = true;
            }
        }

        public boolean isEmpty(){
            return empty;
        }
        public boolean isBoiled(){
            return boiled
        }
    }
```

##### problem
  - java는 멀티스레드이고, JVM은 여러 스레드를 번갈아가며 공평하게 코드를 실행시킵니다. 
  - 두개의 스레드가 실행되고있다고 가정한다면, 위의 코드에서 uniqueInstance를 생성하려는 시점에서 "모두 인스턴스가 없다" 라는 상황이 발생할수있으며 이는 두개의 인스턴스가 생성될수 있습니다. 
  - 해결방법 1
     ```java
      public static synchronized ChocolateBoiler getInstance(){
              if(uniqueInstance == null){
                  uniqueInstance = new ChocolateBoiler();
              }
              return uniqueInstance
          }
       ```
       - 속도문제가 발생할수있습니다.
   - 해결방법 2
     ```java
        public class ChocolateBoiler{
            static ChocolateBoiler uniqueInstance = new ChocolateBoiler();
        }
       ```
       - 인스턴스를 만들려고 의도하지않아도 이미 만들어져 있습니다. 
#### 3. best way - enum
- enum이란 서로 연관된 상수들의 집합을 의미하며 상수들만 모아놓은 클래스라고 할 수 있습니다. 때문에 클래스처럼 메소드, 생성자를 모두 가질 수 있습니다.
- 또한 enum은 private 생성자를 갖습니다. 
- 즉 싱글톤을 구현할때 클래스로 만들수있지만 enum을 써서도 구현할수있습니다. enum을 통해서도 singleton의 목적을 달성할수 있습니다. 
- 추가로 enum을 통해 class를 사용해서 나타났던 문제(synchronization, class loading issues)도 제거할수 있습니다.
```java
// 2. implement with enum
public enum Singleton {
    UNIQUE_INSTANCE;
}
public class SingletonClient {
       public static void main(String[] args) {
              Singleton singleton = Singleton.UNIQUE_INSTANCE;
       }
}
```
### 그러면 처음부터 enum을 쓰면 될텐데 singleton 패턴을 알아야할 이유가 있을까요?
- 그럼에도 sington 패턴을 알아야 하는 이유는 enum이 없는 언어가 있고, 면접에서 "enum 없이 sington구현해라" 요구사항을 받을수 있기때문입니다.(~~ㅎㅎ?~~)
- 또한 예전에는 Java에 enum이 없었기때문에 singleton 패턴이 생긴것입니다.
