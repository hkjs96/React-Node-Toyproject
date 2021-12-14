import http from "../http-common";

// 해당 모듈안에서 axios 를 사용하고 있다.
// http-common에서 base url을 /api로 지정했음.
// 따라서 자동으로 /api/boards/ 이렇게 요청이 가게된다.

import authHeader from "./auth-header";

class UserDataService {
    // 모든 사용자 검색
    getAllUsers() {
        return http.get("/users", { headers: authHeader() });
    }

    // no 번쨰 사용자 검색
    getUsers(no) {
        return http.get(`/users/${no}`, { headers: authHeader() });
    }

    // // 사용자 등록
    // createUsers(data) {
    //     return http.post("/users", data);
    // }

    // no 번쨰 사용자 수정
    // updateUsers(no, data) {
    //     return http.put(`/boards/${no}`, data);
    // }

    // no 번째 사용자 삭제 처리
    deleteUsers(no) {
        return http.delete(`/users/${no}`, { headers: authHeader() });
    }

    // 유저 이름으로 찾기?? 아니면 그냥 찾기 하나로 하는데 그 분류를 줘서 처리하도록??
    // findByName(title) {
    //     return http.get(`/boards?title=${title}`);
    // }
}

export default new UserDataService();