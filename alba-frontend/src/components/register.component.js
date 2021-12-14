/*
    등록 페이지
    이 페이지는 로그인 페이지 와 유사합니다 .

    양식 유효성 검사의 경우 다음과 같은 세부 정보가 있습니다.

    id: 필수, 3~20자
    name: 필수, 이메일 형식
    password: 필수, 6~40자
    AuthService.register()메소드를 호출 하고 응답 메시지(성공 또는 오류)를 표시합니다.
*/

import React, { Component } from "react"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import { isName } from "validator"

import AuthService from "../services/auth.service"

const required = value => {
    if(!value) {
        return ( 
            <div className="alert alert-danger" role="alert">
                필수 입력값입니다!
            </div>
        );
    }
};

const name = value => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                이름을 입력해주세요.
            </div>
        );
    }
};

const vid = value => {
    if (value.length < 3 || value.lenth > 20) {
        return (
            <div className="alert  alert-danger" role="alert">
                ID는 3 ~ 20 문자를 입력해주세요.
            </div>
        );
    }
};

const vpassword = value => {
    if(value.length < 6 || value.lenth > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                비밀번호는 6 ~ 40 문자를 입력해주세요.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            id: "",
            name: "",
            password: "",
            sucessful: false,
            message: ""
        };
    }

    onChangeId(e) {
        this.setState({
          id: e.target.value
        });
      }
    
      onChangeName(e) {
        this.setState({
          name: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
    
      handleRegister(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.register(
            this.state.id,
            this.state.name,
            this.state.password
          ).then(
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              });
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                successful: false,
                message: resMessage
              });
            }
          );
        }
      }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img 
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                        this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                        <div>
                            <div className="form-group">
                            <label htmlFor="id">Id</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="id"
                                value={this.state.id}
                                onChange={this.onChangeId}
                                validations={[required, vid]}
                            />
                            </div>

                            <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                validations={[required, name]}
                            />
                            </div>

                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required, vpassword]}
                            />
                            </div>

                            <div className="form-group">
                            <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                        )}

                        {this.state.message && (
                        <div className="form-group">
                            <div
                            className={
                                this.state.successful
                                ? "alert alert-success"
                                : "alert alert-danger"
                            }
                            role="alert"
                            >
                            {this.state.message}
                            </div>
                        </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        )
    }
}