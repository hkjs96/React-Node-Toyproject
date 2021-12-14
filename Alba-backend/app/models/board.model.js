module.exports = (sequelize, Sequelize) => {
    const Board = sequelize.define("board", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      published: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  
    return Board;
  };

// module.exports = (sequelize, Sequelize) => {
//   class User extends Model {}

//   User.init({
//       //Model attributes are defined here
//       title: {
//         type: Sequelize.STRING
//       },
//       description: {
//         type: Sequelize.STRING
//       },
//       published: {
//         type: Sequelize.BOOLEAN
//       }
//   },{
//     // Other model options go here
//     sequelize, // We need to pass the connection instance
//     modelName: 'User' // We need to choose the model name, default equal class-name
// });

//   return Board
// };

/*
    이 Sequelize Model은 MySQL 데이터베이스의 Board 테이블을 나타냅니다 . 이러한 열은 자동으로 생성됩니다: id , title , description , 게시됨 , createdAt , updatedAt .

    Sequelize를 초기화한 후에는 CRUD 함수를 작성할 필요가 없습니다. Sequelize는 다음과 같은 모든 기능을 지원합니다.

    새 Board 만들기: create(object)
    id로 Board 찾기: findByPk(id)
    모든 Board 얻기: findAll()
    ID로 Board 업데이트: update(data, where: { id: id })
    Board 제거: destroy(where: { id: id })
    제목으로 모든 Board 찾기: findAll({ where: { title: ... } })
    이러한 기능은 컨트롤러에서 사용됩니다.
*/