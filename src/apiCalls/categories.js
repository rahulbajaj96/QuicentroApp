import { ApiCallGet } from "../services/ApiService";
import { API_URL } from "../config";

const getCategories = () => ApiCallGet(API_URL.getCategories, '').then(response => response);

const getProductsByCategory = (category) => ApiCallGet(`category/${category}`, '').then(response => response);

export { getCategories, getProductsByCategory };