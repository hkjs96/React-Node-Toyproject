const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// sequelize.define 하는 부분을 모듈화 한 것으로 보임.
db.boards = require("./board.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.users.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.ROLES = ["user", "admin"];

module.exports = db;

/*
  user 와 role 같의 연결은 Many to Many 관계이다.
  - 한 user는 여러 role 을 가질 수 있다.
  - 하나의 role 은 여러 user가 맡을 수 있다.

  우리 `User.belongToMany(Role)` 은 사용자 모델이 많은 Role에 속할 수 있고
  그 반대 경우도 마찬 가지임을 나타내기 위해 사용 합니다.

  `Users` 와 `Roles` 테이블 간의 연결로 `through` 를 사용하면 기본 키를 외래 키로 사용하여 
  `foreignKey, otherKey` 새 테이블 "user_roles" 을 갖게 됩니다. 

  
*/