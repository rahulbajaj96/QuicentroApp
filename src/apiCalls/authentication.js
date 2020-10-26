import { ApiCallGet, ApiCallPost } from "../services/ApiService";
import { API_URL } from "../config";


const UserLogin = (formdata) => ApiCallPost(API_URL.login, formdata).then(response => response);

const UserRegisteration = (formdata) => ApiCallPost(API_URL.register, formdata).then(response => response);

const UserLogout = (formdata) => ApiCallPost(API_URL.logout, formdata).then(response => response);


const UserProfile = (formdata) => ApiCallGet(`${API_URL.profile}${formdata}`).then(response => response);



export { UserLogin, UserRegisteration, UserLogout, UserProfile };