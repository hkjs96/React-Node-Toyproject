const eventBus = {
    on(event, callback) {
      document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event, data) {
      document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
      document.removeEventListener(event, callback);
    },
  };
  
  export default eventBus;

  /*
    – `on()` 메소드 `document` 객체 EventListener 가  연결됩니다. `event` 가 발동 되면 `callback`가 호출 될 됩니다.
    – `dispatch()` 메서드는 `CustomEvent` API 를 사용한 `event`를 시작 합니다.
    – `remove()` 메소드는 `document` 객체 에서 첨부 파일 `event` 을 제거합니다.

    다음으로 `EventBus` 는 App 구성 요소를 가져오고 "logout" 이벤트를 수신합니다 .
  */