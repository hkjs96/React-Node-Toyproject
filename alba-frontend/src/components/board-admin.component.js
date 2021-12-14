import React, { Component } from "react";

import UserService from "../services/user.service";

import EventBus from "../common/EventBus";
import { Link } from "react-router-dom";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.searchNo = this.searchNo.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.onChangeSearchNo = this.onChangeSearchNo.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);

    this.state = {
      users: [], 
      currentUser: null,
      currentIndex: -1,
      searchNo: ""
    };
  }

  // 페이지 초기화
  componentDidMount() {
    this.retrieveUsers();
  }

  // No 를 입력받는 곳
  onChangeSearchNo(e) {
    const searchNo = e.target.value;

    this.setState({
        searchNo: searchNo
    });
  }


  // 게시글 조회하는 곳
  retrieveUsers() {
    UserService.getAllUsers()
    .then(response => {
        this.setState({
            users: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
        if (e.response && e.response.status === 401) {
          EventBus.dispatch("logout");
      }
    });
  }

  // 게시글 목록 새로조회?
  refreshList() {
    this.retrieveUsers();
    this.setState({
        // 어떤 설정???
        currentUser: null,
        currentIndex: -1
    });
  }

  // 현재 잡힌 게시글 정보
  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  // 입력한 번호으로 검색
  searchNo() {
    UserService.getUsers(this.state.searchNo)
    .then(response => {
        this.setState({
            users: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
  }

  deleteUser(no) {
    UserService.deleteUsers(no)
    .then(response => {
      this.currentUser.delete = 1;
      
      this.currentUser.delete ? console.log('삭제 처리 완료') : console.log('복구 처리 완료');
    })
    .catch(e => {
      console.log(e);
    });
  }

  render() {
    const { searchNo, users, currentUser, currentIndex } = this.state;

    return (
      <div className="list row">
          <div className="row col-md-12" style={{ float: "none", margin: "0 auto" }}>
              <div className="mx-auto input-group mb-3" style={{width: "50%"}}>
                  <input
                  type="text"
                  className="form-control"
                  placeholder="Search by No"
                  value={searchNo}
                  onChange={this.onChangeSearchNo}
                  />
                  <div className="input-group-append">
                  <button
                      className="btn btn-outline-success"
                      type="button"
                      onClick={this.searchNo}
                  >
                      Search
                  </button>
                  </div>
              </div>
          </div>
          <div className="col-md-6">
          <h4>사용자 목록</h4>

          <ul className="list-group">
              {users &&
                  users.map((user, index) => (
                  <li
                      className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveUser(user, index)}
                      key={index}
                  >
                      {user.name}
                  </li>
              ))}
          </ul>

          </div>
          <div className="col-md-6">
          {/* 게시글이 조회가 된다면 */}
          {currentUser ? (
              <div>
              <h4>사용자</h4>
              <div>
                  <label>
                  <strong>ID:</strong>
                  </label>{" "}
                  {currentUser.id}
              </div>
              <div>
                  <label>
                  <strong>이름:</strong>
                  </label>{" "}
                  {currentUser.name}
              </div>
              <div>
                  <label>
                  <strong>삭제 여부:</strong>
                  </label>{" "}
                  {currentUser.delete ? "Published" : "Pending"}
              </div>

              <button type="button" onClick={this.deleteUser(currentUser.no)}
                  className="badge badge-warning"
              >
                  삭제
              </button>
              </div>
          ) : (
              <div>
              <br />
              <p>사용자 목록에서 사용자 이름을 클릭하세요.</p>
              </div>
          )}

          </div> 
      </div>
  );
  }
}