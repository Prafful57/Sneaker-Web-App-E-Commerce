
import axios from "axios";
import updateHeaderInterceptor from "./Login-Page/Interceptors/updateHeaderInceptor";
import handleErrorInterceptor from "./Login-Page/Interceptors/handleErrorInceptor";

const instance = axios.create({
// baseURL:"https://www.omdbapi.com",
  baseURL:"http://localhost:4001"

});
updateHeaderInterceptor(instance);
handleErrorInterceptor(instance);

export default instance;