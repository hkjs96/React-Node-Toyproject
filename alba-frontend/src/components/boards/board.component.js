/*
    구성 요소 수명 주기 메서드를 사용 componentDidMount()하여 Web API에서 데이터를 가져옵니다.

    get()
    update()
    delete()
*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import BoardDataService from "../../services/board.service";

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getBoard = this.getBoard.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);

        this.state = {
            currentBoard: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }

    // component 초기화 하는 부분?
    componentDidMount() {
        this.getBoard(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentBoard: {
              ...prevState.currentBoard,
              title: title
            }
          };
        });
      }
    
      onChangeDescription(e) {
        const description = e.target.value;
        
        this.setState(prevState => ({
            currentBoard: {
            ...prevState.currentBoard,
            description: description
          }
        }));
      }

    // 게시글 조회
    getBoard(id) {
        BoardDataService.get(id)
        .then(response => {
            this.setState({
                currentBoard: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    // 게시글 수정
    updateBoard() {
        BoardDataService.update(
            this.state.currentBoard.id,
            this.state.currentBoard
        )
        .then(response => {
            console.log(response.data);
            window.location.replace("/boards");
            // this.setState({
            //     message: "게시글 수정 완료!"
            // });
        })
        .catch(e => {
            console.log(e);
        });
    }

    // 게시글 삭제 처리
    deleteBoard() {    
       BoardDataService.delete(this.state.currentBoard.id)
          .then(response => {
            console.log(response.data);
            this.props.history.push('/boards')
          })
          .catch(e => {
            console.log(e);
          });
    }

    render() {
        const { currentBoard } = this.state;

        return (
            <div className="mx-auto" style={{width: "50%"}}>
            {currentBoard ? (
                <div className="edit-form">
                <h4>게시판</h4>
                <form>
                    <div className="form-group row">
                        <div className="col-md-2 mt-1">
                            <label htmlFor="title">제목</label>
                        </div>
                        <div className="col-md-10">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={currentBoard.title}
                                onChange={this.onChangeTitle}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2 mt-1">
                            <label htmlFor="description">내용</label>
                        </div>
                        <div className="col-md-10">
                            <textarea className="form-control" id="description" value={currentBoard.description} onChange={this.onChangeDescription}/>
                        </div>
                    </div>

                    {/* <div className="form-group">
                    <label>
                        <strong>Status:</strong>
                    </label>
                    {currentBoard.published ? "Published" : "Pending"}
                    </div> */}
                </form>

                {/* {currentBoard.published ? (
                    <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublished(false)}
                    >
                    UnPublish
                    </button>
                ) : (
                    <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublished(true)}
                    >
                    Publish
                    </button>
                )} */}

                <button
                    className="badge badge-danger mx-1"
                    onClick={this.deleteBoard}
                >
                    삭제하기
                </button>

                <button
                    type="submit"
                    className="badge badge-success mx-1"
                    onClick={this.updateBoard}
                >
                    수정하기
                </button>

                <Link to="/boards">
                    <button
                        type="button"
                        className="badge badge-primary mx-1"
                    >
                        목록으로
                    </button>
                </Link>

                <p>{this.state.message}</p>
                </div>
            ) : (
                <div>
                <br />
                <p>Please click on a Board...</p>
                </div>
            )}
            </div>
        );
    }
}