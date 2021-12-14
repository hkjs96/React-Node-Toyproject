import React, { Component } from "react";
import {Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from "./services/auth.service";

import BoardsList from "./components/boards/boards-list.component";
import AddBoard from "./components/boards/add-board.component";
import Board from "./components/boards/board.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardAdmin from "./components/board-admin.component";


// JWT 로그아웃 처리 관련 
// EventBus 는 상하 관계 없는 컴포넌트끼리 통신할 수 있다고 한다. 
import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component  {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      // 관리자 페이지를 감추고 현재 User 정보도 로그인 상태가 아니므로 undefined 상태로 잡있다.
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#parameters
        // Array.prototype.includes() 메서드는 Array에 인자 값이 존재하는 지에 따라 true, false를 반환합니다.
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  // user의 정보를 초기화한다.
  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  
  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div className="App">
        {/* <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}> */}
        <nav class="headerNav navbar navbar-expand-lg navbar-light">
          <Link to={"/"} className="navbar-brand nav-link">
            알바컴
          </Link>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {currentUser && (
                <li class="nav-item active">
                  <Link to={"/boards"} className="nav-link">
                    게시판
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    사용자 관리
                  </Link>
                </li>
              )}
              
              
              {/* <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li> */}
            </ul>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.id}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
        {/* exact path 하면 딱 그 것만 처리하고 switch를 사용하면 안에 걸리는 것중 제일 처음것만 보여준다. */}
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/admin" component={BoardAdmin} />
          <Route exact path={["/boards"]} component={BoardsList} />
          <Route exact path="/add" component={AddBoard} />
          <Route exact path="/boards/:id" component={Board} />
          <Switch>
          </Switch>
        </div>

         <AuthVerify logOut={this.logOut}/>
      </div>
    );
  }
}

export default App;
