/*  
    Define Route

    클라이언트가 HTTP 요청(GET, POST, PUT, DELETE)을 사용하여 엔드포인트에 대한 요청을 보낼 때 경로를 설정하여 서버가 응답하는 방법을 결정해야 합니다.

    다음은 우리의 경로입니다:

    /api/users: 가져오기, 게시, 삭제
    /api/users/:id: GET, PUT, DELETE
    /api/users/published: 가져 오기
*/

const { authJwt } = require("../middleware");
const users = require("../controllers/user.controller.js");

var router = require("express").Router();

module.exports = app => {

    router.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // 사용자 생성
    // router.post("/", users.create);
  
    // 사용자 조회
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], users.findAll);
  
    // 등록 번호로 사용자 조회
    router.get("/:no", [authJwt.verifyToken, authJwt.isAdmin], users.findOne);
  
    // 사용자 정보 업데이트
    // router.put("/:no", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:no", [authJwt.verifyToken], users.delete);
  
    // // Delete all Tutorials
    // router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };