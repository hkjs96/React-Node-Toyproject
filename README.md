# React-Node-Toyproject 
알바 관리 및 알바 커뮤니티 시스템

# Technology
- React
- Node
- MySQL

# Back-End
- express 4.17.1
- cors 2.8.5 
- mysql (mysql2 2.3.3)
- sequelize 6.12.0-alpha.1 (v6 사용하면 mysql2 설치)\
- jsonwebtoken 8.5.1
- bcryptjs 2.4.3

## Board REST API
- create
- update
- findOne
- findAll
- delete

## User REST API
<!-- - create -->
<!-- - update -->
- findOne
- findAll
- delete

## Auth ??
- signup
- signin
- login 
- logout

## User
- bcrypt


# Front-end 
- React 16
- react-router-dom 5.1.2
- axios 0.19.2
- bootstrap 4.4.1
- react-validation 3.0.7
- validator 13.7.0

## 공부한 것
service 단 분리

BrowserRouter 요소

### Component Lifecycle
constructor() -> static getDerivedStateFromProps() -> render() -> **componentDidMount()**
**componentDidMount()** : 컴포넌트가 마운트 된 직후, 초기화 작업 여기서 수행하는 게 좋음. ( 네트워크 요청 보내기 좋음).

## React-router-dom v5
[v5.reactrouter - BrowserRouter](https://v5.reactrouter.com/web/api/BrowserRouter)

```html
<BrowserRouter basename="/calendar">
    <Link to="/today"/> // renders <a href="/calendar/today">
    <Link to="/tomorrow"/> // renders <a href="/calendar/tomorrow">
    ...
</BrowserRouter>
```

`<Route path="/tutorials/:id" component={Tutorial} />`
위 `<Route>` 처럼 Route하고 component를 지정해야지 Link로 해당 path로 보내졌을 때 해당 페이지를 불러온다.

## EventBus
컴포넌트 간의 통신은 상하 관계에 따라 통신을 하게끔 되어있다. 하지만 EventBus를 사용하게 되면 상하 관계가 아닌 컴포넌트 들과 직접 통신할 수 있게 된다.

## props
props는 상위에서 하위 컴포넌트로 값을 전달할 수 있다.
[프로 독학러 - 2.하위컴포넌트로 값을 전달하는 방법](https://pro-self-studier.tistory.com/38)