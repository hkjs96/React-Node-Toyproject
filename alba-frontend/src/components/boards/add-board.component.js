/*
    먼저 생성자를 정의하고 초기 상태를 설정 this하고 다른 이벤트에 바인딩 합니다.
    2개의 필드가 있으므로 입력 값을 추적하고 변경 사항에 대해 해당 상태를 설정하는 2개의 함수를 만듭니다. 폼(상태)의 값을 가져와서 웹 API에 POST 요청을 보내는 기능도 있습니다. 
    BoardlDataService.create()메소드를 호출 합니다.
    render() 메소드는, `submitted` 값이 사실이라면 우리는 다시 새로운 튜토리얼을 만들기위한 추가 버튼을 보여줍니다.
    그렇지 않으면 양식이 표시됩니다.
*/
import React, { Component } from "react";
import BoardDataService from "../../services/board.service";

export default class AddBoard extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
    // this.newBoard = this.newBoard.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,

    //   submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveBoard() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    BoardDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

        //   submitted: true
        });
        console.log(response.data);
        window.location.replace("/boards");
      })
      .catch(e => {
        console.log(e);
      });
  }

//   newBoard() {
//     this.setState({
//       id: null,
//       title: "",
//       description: "",
//       published: false,

//       submitted: false
//     });
//   }

  render() {
    return (
      <div className="submit-form">
        {/* {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBoard}>
              Add
            </button>
          </div>
        ) : ( */}
          <div className="mx-auto" style={{width: "60%"}}>
            <div className="form-group row">
                <div className="col-md-2 mt-1">
                    <label htmlFor="title">제목</label>
                </div>
                <div className="col-md-10">
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-md-2 mt-1">
                    <label htmlFor="description">내용</label>
                </div>
                <div className="col-md-10">
                    <textarea className="form-control" id="description" value={this.state.description} onChange={this.onChangeDescription}/>
                </div>
            </div>

            <button onClick={this.saveBoard} className="btn btn-success">
              Submit
            </button>
          </div>
        {/* )} */}
      </div>
    );
  }
}