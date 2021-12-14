import React, { Component } from "react";
import BoardDataService from "../../services/board.service";
import { Link } from "react-router-dom";

export default class BoardsList extends Component {
    constructor(props) {
        super(props);
        this.searchTitle = this.searchTitle.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBoard = this.setActiveBoard.bind(this);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveBoards = this.retrieveBoards.bind(this);

        this.state = {
            boards: [], 
            currentBoard: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    // 게시글 목록 초기화
    componentDidMount() {
        this.retrieveBoards();
    }

    // 제목 값 입력 시 받는 곳
    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    // 게시글 조회하는 곳
    retrieveBoards() {
        BoardDataService.getAll()
        .then(response => {
            this.setState({
                boards: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    // 게시글 목록 새로조회?
    refreshList() {
        this.retrieveBoards();
        this.setState({
            // 어떤 설정???
            currentBoard: null,
            currentIndex: -1
        });
    }

    // 현재 잡힌 게시글 정보
    setActiveBoard(board, index) {
        this.setState({
          currentBoard: board,
          currentIndex: index
        });
    }

    // 입력한 제목 값으로 검색
    searchTitle() {
        BoardDataService.findByTitle(this.state.searchTitle)
        .then(response => {
            this.setState({
                boards: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { searchTitle, boards, currentBoard, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="row col-md-12" style={{ float: "none", margin: "0 auto" }}>
                    <div className="mx-auto input-group mb-3" style={{width: "50%"}}>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={this.searchTitle}
                        >
                            Search
                        </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <Link to="/add">
                        <button
                            className="btn btn-primary"
                        >
                            글 쓰기
                        </button>
                    </Link>
                </div>
                <div className="col-md-6">
                <h4>게시글 목록</h4>

                <ul className="list-group">
                    {boards &&
                        boards.map((board, index) => (
                        <li
                            className={
                                "list-group-item " +
                                (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveBoard(board, index)}
                            key={index}
                        >
                            {board.title}
                        </li>
                    ))}
                </ul>

                {/*
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={this.removeAllBoards}
                >
                    Remove All
                </button>
                */}
                </div>
                <div className="col-md-6">
                {/* 게시글이 조회가 된다면 */}
                {currentBoard ? (
                    <div>
                    <h4>게시글</h4>
                    <div>
                        <label>
                        <strong>제목:</strong>
                        </label>{" "}
                        {currentBoard.title}
                    </div>
                    <div>
                        <label>
                        <strong>내용:</strong>
                        </label>{" "}
                        {currentBoard.description}
                    </div>
                    
                    {/* <div>
                        <label>
                        <strong>삭제 여부:</strong>
                        </label>{" "}
                        {currentBoard.published ? "Published" : "Pending"}
                    </div> */}

                    <Link
                        to={"/boards/" + currentBoard.id}
                        className="badge badge-warning"
                    >
                        수정
                    </Link>
                    </div>
                ) : (
                    <div>
                    <br />
                    <p>Please click on a Board...</p>
                    </div>
                )}

                </div> 
            </div>
        );
    }
}
