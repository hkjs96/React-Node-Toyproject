/*
    exports 에 (sequlize, Sequelize) 를 매개 변수로 받는 함수를 담는다.
*/
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      no: {
        type: Sequelize.INTEGER(6),
        primaryKey: true ,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
          type: Sequelize.STRING(30),
          allowNull: false
      },
      delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    });
  
    return User;
  };
