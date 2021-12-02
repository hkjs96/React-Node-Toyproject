/*  
    Define Route

    클라이언트가 HTTP 요청(GET, POST, PUT, DELETE)을 사용하여 엔드포인트에 대한 요청을 보낼 때 경로를 설정하여 서버가 응답하는 방법을 결정해야 합니다.

    다음은 우리의 경로입니다:

    /api/boards: 가져오기, 게시, 삭제
    /api/boards/:id: GET, PUT, DELETE
    /api/boards/published: 가져 오기
*/

module.exports = app => {
    const boards = require("../controllers/board.controller");

    var router = require("express").Router();

    // 새로운 게시글 작성
    router.post("/", boards.create);

    // 전체 게시물 목록 조회, 허가 안된 게시물은 조회 안되게 함.
    router.get("/", boards.findAll);
    
    // id로 단일 게시물 조회
    router.get("/:id", boards.findOne);

    // id에 해당 하는 게시물 수정
    router.put("/:id", boards.update);

    // id에 해당하는 게시물 삭제 처리
    router.delete("/:id", boards.delete);

    app.use('/api/boards', router);
};