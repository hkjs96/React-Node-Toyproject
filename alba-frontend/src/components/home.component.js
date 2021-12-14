/*
    홈페이지
    공개 콘텐츠를 보여주는 공개 페이지입니다. 사람들은 이 페이지를 보기 위해 로그인할 필요가 없습니다.
*/

import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Home 화면입니다."
    };
  }

  // componentDidMount() {
  //   UserService.getPublicContent().then(
  //     response => {
  //       this.setState({
  //         content: response.data
  //       });
  //     },
  //     error => {
  //       this.setState({
  //         content:
  //           (error.response && error.response.data) ||
  //           error.message ||
  //           error.toString()
  //       });
  //     }
  //   );
  // }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}