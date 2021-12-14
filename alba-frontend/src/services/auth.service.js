// (Authentication service)
/*
    Authentication service
    이 서비스는 HTTP 요청에 Axios를 사용하고 사용자 정보 및 JWT에 Local Storage를 사용합니다.
    다음과 같은 중요한 방법을 제공합니다.

    login(): POST {id, password} & JWT로컬 저장소에 저장
    logout(): JWT로컬 저장소에서 제거
    register(): POST {사용자 이름, 이메일, 비밀번호}
    getCurrentUser(): 저장된 사용자 정보 가져오기(JWT 포함)
*/

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(id, password) {
        return axios
            .post(API_URL + "signin", {
                id,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    // user 라는 이름으로  브라우저의 localStorage에 response.data를 저장
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(id, name, password) {
        return axios.post(API_URL + "signup", {
            id,
            name,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();