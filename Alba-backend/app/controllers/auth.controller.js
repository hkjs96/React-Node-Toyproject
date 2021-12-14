/*
    인증에는 2가지 주요 기능이 있습니다.
      - sign up : 데이터베이스에 새 사용자 생성, (역할을 지정하지 않은 경우 역할은 사용자 임)
      - sign in : 
        1. 유저가 존재하는 경우 데이터베이스에서 요청 찾기
        2. 올바른 경우 `bcrypt`를 사용하여 데이터베이스 password와 비교
        3. jsonwebtoken을 사용하여 토큰 생성
        4. 사용자 정보 및 액세스 토큰 반환
*/

const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// 유저를 생성할 떄 Role이 있는지 먼저 확인하고 유저생성 없으면 user 권한으로 부여
exports.signup = (req, res) => {
  // Validate request
  if (!req.body.id || !req.body.password || !req.body.name) {
    res.status(400).send({
        message: "입력 값이 비어있습니다."
    });
    return;
}
  // Save User to Database
  User.create({
    id: req.body.id,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "가입을 축하드립니다!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "가입을 축하드립니다!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          no: user.no,
          id: user.id,
          name: user.name,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
