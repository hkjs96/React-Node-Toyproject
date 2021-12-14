
/*
    Sign up 작업을 확인하려면 두가지 기능이 필요
    - username / email 중복 여부 확인
    - 요청에 roles 존재하는지 여부 확인
*/

const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // id
  User.findOne({
    where: {
      id: req.body.id
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! id is already in use!"
      });
      return;
    }

    // // no
    // User.findOne({
    //   where: {
    //     no: req.body.no
    //   }
    // }).then(user => {
    //   if (user) {
    //     res.status(400).send({
    //       message: "Failed! no is already in use!"
    //     });
    //     return;
    //   }

    //   next();
    // });

    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

/*
    https://expressjs.com/ko/guide/routing.html

    Router 의 하나의 콜백 함수 배열은 하나로 지정하여 처리할 수 있다.
*/

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;

