import { ApiCallGet } from "../services/ApiService";
import { API_URL } from "../config";

const getWishList = (apiUrl) => ApiCallGet(`${API_URL.get_wishlist}${apiUrl}`).then(response => response);

const AddToWishList = (apiUrl) => ApiCallGet(`${API_URL.add_to_wishlist}${apiUrl}`).then(response => response);

const RemoveFromWishList = (apiurl) => ApiCallGet(`${API_URL.remove_from_wishlist}${apiurl}`).then(response => response);


export { getWishList, AddToWishList, RemoveFromWishList };