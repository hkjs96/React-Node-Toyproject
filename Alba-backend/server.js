const express = require("express"); // REST API를 구축하기 위해서
const cors = require("cors"); // 교차 응답을 위해 cross-origin-resource-sharing(cors)

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// request 요청 중 content-type - application/json 인 경우 파싱
app.use(express.json());

// request 요청 중 content-type - application/x-www-form-urlencoded 인 경우 파싱
app.use(express.urlencoded({ extended: true}));

const db = require("./app/models");
const Role = db.role;
// const User = db.users;

// var bcrypt = require("bcryptjs");

// db.sequelize.sync();
// force: true 개발 중에 강제로 DB 세팅하는 옵션
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    initial();
});
// 데이터베이스에 있는 테이블의 현재 상태(열이 있는 열, 데이터 유형이 무엇인지 등)를 확인한 다음 테이블에서 필요한 변경을 수행하여 모델과 일치하도록 합니다
// db.sequelize.sync({ alter: true }).then(() => {
//     console.log('없는 내용 보충하는 곳')
//     initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({message: "알바 관리 및 알바 커뮤니티 사이트입니다."})
});

require("./app/routes/board.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);

// 포트 세팅 및 서버 구동
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`${PORT} 포트로 서버 가동!`);
});


// roles 테이블 기본값 생성
function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    // Role.create({
    //   id: 2,
    //   name: "moderator"
    // });
   
    Role.create({
      id: 2,
      name: "admin"
    });

    // User.create({
    //     id: "admin",
    //     name: "admin",
    //     password: bcrypt.hashSync("qwer!!1234", 8)
    // })
}