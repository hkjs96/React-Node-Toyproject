/*
    create
    findAll
    findOne
    update
    delete
*/

const db = require("../models");
const Board = db.boards;
const Op = db.Sequelize.Op; // Op, Operator 쿼리에 사용될 연산자

// Board 를 생성하고 저장
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        res.status(400).send({
            message: "제목값이 비어 있습니다."
        });
        return;
    }

    // Board 생성
    const board = {
        title: req.body.title,
        description: req.body.description,
        // published: req.body.published ? req.body.published : false
        published: true
    };

    // 데이터베이스에 Board 저장
    Board.create(board)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "게시글 생성 중 에러 발생"
        });
    });
};

// 검색 조건을 통한 게시글(Board) 조회
exports.findAll = (req, res) => {
    const title = req.query.title;

    // 나중에 제목 말고 다른 조건으로 검색할 때는 로직을 어떻게 변경할지 생각해봐야겠다.
    var condition = title ? { title: { [Op.like] : `%${title}%` } } : null;
    var publishedCondition = { published: true };

    Board.findAll({
        where: {
            [Op.and]: [ 
                publishedCondition, condition
            ]
        }
    })
    .then(data=> {
        res.send(data);
    })
    .catch(err => {
        res.stauts(500).send({
            message:
            err.message || "게시글 조회 중 에러 발생"
        });
    });
};

// id토 게시글(Board) 조회
exports.findOne = (req, res) => {
    const id = req.params.id;

    Board.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `${id} 번 게시글을 찾을 수 없습니다.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `${id} 번 게시물 조회 중 에러발생`
        });
    });
};


/*
    // Change everyone without a last name to "Doe"
    // 이름 없는 모든 User 모델의 last name을 `Doe로 업데이트`
    await User.update({ lastName: "Doe" }, {
        where: {
            lastName: null
        }
    });
*/
// id에 해당하는 게시글 변경
exports.update = (req, res) => {
    const id = req.params.id;

    /* 
        req.body -> key-value 로 본문에서 넘어온 내용을 담기 때문에
                    title, description 등의 내용도 포함되어 있다.
    */
    Board.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if( num == 1) {
            res.send({
                message: "게시글 업데이트 완료"
            });
        } else {
            res.send({
                message: `Cannot update 게시글 with id=${id}. Maybe 게시글 was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "게시글 업데이트 중 에러 발생"
        });
    });
};

// id에 해당하는 게시글 삭제
exports.delete = (req, res) => {
    const id = req.params.id;
    const condition = { published : false };

    // update API로 삭제 처리 
    Board.update(condition, {
        where: { id: id }
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "게시글 삭제 완료"
            });
        } else {
            res.send({
                message: `id 번 게시글 삭제할 수 없습니다. 없는 게시물이거나 req.body 가 비어 있는것 같습니다.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: '게시글 삭제 중 에러 발생'
        });
    });

    /*
    // 진짜 삭제가 아니라 삭제 처리한 것으로 변경하기
    Board.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "게시글 삭제 완료"
            });
        } else {
            res.send({
                message: `id 번 게시글 삭제할 수 없습니다. 없는 게시물이거나 req.body 가 비어 있는것 같습니다.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: '게시글 삭제 중 에러 발생'
        });
    });
    */
}