/*
    create
    findAll
    findOne
    update
    delete
*/

const bcrypt = require('bcrypt');
const saltRounds = process.env.SALTROUNDS;

const db = require("../models");
const userModel = require('../models/user.model');
const User = db.users;
const Op = db.Sequelize.Op; // where 절 같은 곳에 사용 될 Operator

// 새로운 로그인 사용자 
/*
exports.create = (req,res) => {
    // Validate request
    if (!req.body.id || !req.body.password || !req.body.name) {
        res.status(400).send({
            message: "입력 값이 비어있습니다."
        });
        return;
    }

    User.findOne({ where: { id: req.body.id } })
    .then(data => {
        if(data) {
            return res.status(400).send({
                message: "이미 존재하는 사용자 입니다!"
            })
        }
        else {
            let password = req.body.password;
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    const user = {
                        id: req.body.id,
                        password: hash,
                        name: req.body.name
                    };
    
                    User.create(user)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                          message:
                            err.message || "사용자 등록중 에러 발생!"
                        });
                    });
                });
            });
        }
    });
}
*/

// id로 사용자 조회, 나중에 이름으로 조회도 추가 하기
exports.findAll = (req, res) => {
    // 검색 조건에 관련된 input 태그 관련 조건을 받고 조건에 따라 분기해야될 듯하다.
    
    const id = req.query.id;
    // var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
    
    User.findAll({ 
        where: {
            // [Op.and] : [
            //     { delete : false } ,
                // condition
            // ]
        }
    })
    // User.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "사용자 조회중 에러 발생!"
        });
    });
    
    /*
      let myPlaintextPassword = '1111';
      let pw = '$2b$10$I02lBXN1NUqw.ot/zkMlQ./v5o7b3KJMl61Ns0syMFJJWbYtR5.zu';
    //   "$2b$10$wdD1NyvL6yZuruyikOX.Qu9TXSceV5Y92UskJtMSLt4Ei4eEACOXy"
    // "$2b$10$I02lBXN1NUqw.ot/zkMlQ./v5o7b3KJMl61Ns0syMFJJWbYtR5.zu"
      bcrypt.compare(myPlaintextPassword, pw, function(err, result) {
          console.log(result);
      });
    */
  };
  
// 등록 No 번호로 사용자 조회
exports.findOne = (req, res) => {
    const no = req.params.no;
    
    User.findByPk(no)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `${no} 번 째 사용자를 찾을 수 없음.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: `${no} 번 째 사용자 조회 중 에러 발생.`
        });
    });
};
  
// // 사용자 정보 변경
// exports.update = (req, res) => {
//     const id = req.params.id;

//     User.update(req.body, {
//     where: { id: id }
//     })
//     .then(num => {
//         if (num == 1) {
//         res.send({
//             message: "Tutorial was updated successfully."
//         });
//         } else {
//         res.send({
//             message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//         });
//         }
//     })
//     .catch(err => {
//         res.status(500).send({
//         message: "Error updating Tutorial with id=" + id
//         });
//     });
// };
  
// 사용자 삭제 처리
exports.delete = (req, res) => {
    const no = req.params.no;
    // const deleteFlag = { delete: true }
    let deleteFlag = undefined

    User.findByPk(no)
    .then(data => {
        deleteFlag = !data.deleteFlag;
    })
    .catch(e => {
        console.log(e);
    }) 

    User.update(deleteFlag, {
        where: { no: no }
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: `${no}번 째 사용자 삭제 처리 완료!`
        });
        } else {
        res.send({
            message: `${no}번 째 사용자를 찾을 수 없습니다.`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `${no} 번 째 사용자 삭제 중 에러 발생!`
        });
    });
};
  
// // 전체 사용자 삭제
// exports.deleteAll = (req, res) => {
//     const deleteFlag = { delete: true }

//     // where 절 어떻게 해야되는거지?
//     User.update( deleteFlag, {
//         where: [Op.all] 
//     })
//     .then(nums => {
//         res.send({ message: `${nums} 명의 사용자 정보를 삭제했습니다!` });
//         })
//         .catch(err => {
//         res.status(500).send({
//             message:
//             err.message || "모든 사용자 정보 삭제 중 에러 발생!"
//         });
//     });
// };