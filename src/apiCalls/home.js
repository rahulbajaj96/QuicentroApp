import { ApiCallGet, ApiCallPost } from "../services/ApiService";
import { API_URL } from "../config";

const getHomeData = () => ApiCallGet(API_URL.home, '').then(response => response);


export { getHomeData };