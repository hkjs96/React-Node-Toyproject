/*
    경로 정의
    클라이언트가 HTTP 요청(GET, POST, PUT, DELETE)을 사용하여 엔드포인트에 대한 요청을 보낼 때 경로를 설정하여 서버가 응답하는 방법을 결정해야 합니다.

    경로를 인증 및 권한 부여(보호된 리소스 액세스)의 두 부분으로 나눌 수 있습니다.

    입증:

    우편 /api/auth/signup
    우편 /api/auth/signin
*/

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  /*
    모든 요청이 use 라는 미들 웨어를 한번 거치고 각각의 라우팅 처리로 간다?
     - https://expressjs.com/ko/guide/using-middleware.html
     - https://morian-kim.tistory.com/3
  */
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /*
    https://expressjs.com/ko/guide/routing.html

    Router 의 하나의 콜백 함수 배열은 하나로 지정하여 처리할 수 있다.
  */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
