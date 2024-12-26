import axios from "axios";
const apiClient =axios.create({
    //backend api
    baseURL:'https://localhost:7130',
    // 跨域攜帶 Cookie
    withCredentials:true,
});
export default apiClient;