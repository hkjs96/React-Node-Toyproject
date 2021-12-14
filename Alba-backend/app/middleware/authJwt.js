/*
    인증 및 권한 부여를 처리하기 위해 다음과 같은 기능이 있습니다.
     - token 제공 되었는지, 합법적인지 여부를 확인.
       우리는에서 토큰을 얻을 X-액세스 토큰 을 누른 후, HTTP 헤더의 jsonwebtoken 의 verify()기능을.
     - 사용자의 필수 역할(roles)이 포함되어 있는지 확인합니다.
*/

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

verifyToken = (req, res, next) => {
    // Request Header 에  `x-access-token` 헤더를 찾는다.
  let token = req.headers["x-access-token"];

  // 토큰이 없으면
  if (!token) {
    return res.status(403).send({
      message: "토큰이 없습니다."
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "권한이 없습니다."
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  // User.findByPk(req.userId).then(user => {
  User.findOne({ where: { id: req.userId } }).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

// isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator Role!"
//       });
//     });
//   });
// };

// isModeratorOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }

//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator or Admin Role!"
//       });
//     });
//   });
// };

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  // isModerator: isModerator,
  // isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;