import http from "../http-common";

// http-common에서 base url을 /api로 지정했음.
// 따라서 자동으로 /api/boards/ 이렇게 요청이 가게된다.
class BoardDataService {
    getAll() {
        return http.get("/boards");
    }

    get(id) {
        return http.get(`/boards/${id}`);
    }

    create(data) {
        return http.post("/boards", data);
    }

    update(id, data) {
        return http.put(`/boards/${id}`, data);
    }

    delete(id) {
        return http.delete(`/boards/${id}`);
    }

    findByTitle(title) {
        return http.get(`/boards?title=${title}`);
    }
}

export default new BoardDataService();