import { ApiCallGet, ApiCallPost } from "../services/ApiService";
import { API_URL } from "../config";

const productSearchGlobal = (search) => ApiCallGet(`${API_URL.product_search_global}${search}`).then(response => response);

const productSearchByCategory = (search) => ApiCallGet(`${API_URL.productSearchByCategory}${search}`).then(response => response);


const checkoutApi = (formdata) => ApiCallPost(`${API_URL.checkout}`, formdata).then(response => response);

export { productSearchGlobal, productSearchByCategory, checkoutApi };