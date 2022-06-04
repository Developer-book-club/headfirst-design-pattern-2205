# 어댑터패턴

**한 인터페이스를 클라이언트에서 요구하는 형태의 인터페이스로 변환해주는 패턴**
인턴페이스를 변환하는 용도로 사용된다.

## 어댑터 패턴 실전 예

사내 지도 라이브러리를 만든다고 가정. 이 지도 SDK는 필요할 때 구글, 네이버, 카카오 지도로 자유롭게 교체할 수 있도록 만들 예정이다.
어댑터 패턴을 이벤트 등록하는 부분에 적용시켜보자.

- 이벤트를 등록하는 함수가 지도 sdk마다 다 다르다.

  ```ts
  // naver-map
  // 전역객체에서 이벤트 등록
  // 네이밍컨벤션도 다름(Event)
  window.naver.maps.Event.addListener(mapInstance, "click", () => {});

  // kakao-map
  // 전역객체에서 등록
  // 네이밍컨벤션도 다름(event)
  window.kakao.maps.event.addListener(mapInstance, "click", () => {});

  // google-map
  // 인스턴스에서 등록
  new google.maps.Map({...}).addListener("click", () => {});
  ```

- 어댑터 패턴을 적용해, 각 클라이언트 Map 인터페이스에 맞춰 각 어댑터를 구현한다.

  ```ts
  // 클라이언트 Map 인터페이스
  interface GaebookMap {
    addEventListner(eventType: string, callback: () => void): void;
  }

  // 구글 맵 어댑터
  class GoogleMapAdapter implements GaebookMap {
    private googleMap;

    constructor(googleMap: GoogleMap) {
      this.googleMap = googleMap;
    }

    addEventListner(eventType: string, callback: () => void): void {
      this.googleMap.addListener(eventType, callback);
    }
  }

  // 카카오 맵 어댑터
  class KakaoMapAdapter implements GaebookMap {
    private kakaoMap;

    constructor(kakaoMap: KakaoMap) {
      this.kakaoMap = kakaoMap;
    }

    addEventListner(eventType: string, callback: () => void): void {
      window.kakao.maps.event.addListener(this.kakaoMap, eventType, callback);
    }
  }

  // 네이버 맵 어댑터
  class NaverMapAdapter implements GaebookMap {
    private naverMap;

    constructor(naverMap: NaverMap) {
      this.naverMap = googleMap;
    }

    addEventListner(eventType: string, callback: () => void): void {
      window.naver.maps.Event.addListener(this.naverMap, eventType, callback); //전역에서
    }
  }
  ```

- 사용부

  ```ts
  // 지도를 바꾸고 싶다면 어댑터만 바꾸면 된다.
  const gaebookMap = new GoogleMapAdapter(new google.maps.Map({...}));
                     new KakaoMapAdapter(new kakao.maps.Map({...}));
                     new NaverMapAdapter(new naver.maps.Map(({...}));


  // 사용하는 쪽은 안바꿔도 된다.
  gaebookMap.addEventListner('click', ()=>{console.log('클릭클릭')})
  ```

## Tip

- 세 지도 중 어떤 지도가 기능이 빠져있다면?
  - 네이버,카카오 위성지도 - 지원 O,
  - 구글 위성지도 - 지원 X

일대일로 대응되지 않는 케이스가 나타나게 됩니다. 이 부분은 안타깝지만, 빠진 부분을 100프로 완벽하게 구현하기 어려운 경우가 있다. 이 부분은 Error(or 예외)를 던지는 형태로 구현한다.

```ts
// 구글 맵 어댑터
class GoogleMapAdapter implements GaebookMap {
  private googleMap;

  constructor(googleMap: GoogleMap) {
    this.googleMap = googleMap;
  }

  toggleSatellite() {
    throw new Error("구글 지도는 위성지도를 지원하지 않습니다.");
  }
}
```

---

## 퍼사드 패턴

서브 시스템에 있는 일련의 인터페이스를 통합 인터페이스로 묶는 역할 -> 인터페이스를 단순하게 만드는 용도로 사용된다.

---

### [최소 지식 원칙(디미터 법칙)](https://tecoble.techcourse.co.kr/post/2020-06-02-law-of-demeter/)

시스템을 디자인 할 때, 어떤 객체든 그 객체와 상호작용하는 클래스의 개수와 상호작용 방식에 기울여야한다는 원칙.

다른 객체에 의존하는 수를 최대한 줄이는 것이 좋다.

```ts
// 지도에 마커가 존재하는지 예제

// 최소지식원칙 어긴 경우
public checkMarkerExist(){
    const marker = this.map.getMarker(); // 마커 객체에 의존한다.
    return marker.hasPosition();
}

// 최소지식원칙 지킨 경우
public checkMarkerExist(){
    return this.map.hasMarker();
}
```
