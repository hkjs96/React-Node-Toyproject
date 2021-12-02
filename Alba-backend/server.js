const express = require("express"); // REST API를 구축하기 위해서
const cors = require("cors"); // 교차 응답을 위해 cross-origin-resource-sharing(cors)
const { application } = require("express");

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

db.sequelize.sync();
// force: true 개발 중에 강제로 DB 세팅하는 옵션
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({message: "알바 관리 및 알바 커뮤니티 사이트입니다."})
});

require("./app/routes/board.routes")(app);

// 포트 세팅 및 서버 구동
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`${PORT} 포트로 서버 가동!`);
});

