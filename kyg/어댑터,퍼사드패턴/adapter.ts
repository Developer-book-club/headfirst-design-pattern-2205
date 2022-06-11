interface GaebookMap {
  addEventListner(eventType: string, callback: () => void): void;
}

class GoogleMapAdapter implements GaebookMap {
  private googleMap;

  constructor(googleMap: GoogleMap) {
    this.googleMap = googleMap;
  }

  addEventListner(eventType: string, callback: () => void): void {
    this.googleMap.addListener(eventType, callback);
  }
}

class KakaoMapAdapter implements GaebookMap {
  private kakaoMap;

  constructor(kakaoMap: KakaoMap) {
    this.kakaoMap = kakaoMap;
  }

  addEventListner(eventType: string, callback: () => void): void {
    window.kakao.maps.event.addListener(this.kakaoMap, eventType, callback);
  }
}

class NaverMapAdapter implements GaebookMap {
  private naverMap;

  constructor(naverMap: NaverMap) {
    this.naverMap = naverMap;
  }

  addEventListner(eventType: string, callback: () => void): void {
    window.naver.maps.Event.addListener(this.naverMap, eventType, callback); //전역에서
  }
}

const gaebookMap = new GoogleMapAdapter(new google.maps.Map({...}));
// const gaebookMap = new KakaoMapAdapter(new kakao.maps.Map({...}));
// const gaebookMap = new NaverMapAdapter(new naver.maps.Map(({...}));


gaebookMap.addEventListner('click', ()=>{console.log('클릭클릭')}) // 사용하는 쪽은 안바꿔도 된다.