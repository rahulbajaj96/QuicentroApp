import { ApiCallGet } from "./ApiService";
import { API_URL } from "../config";

// import { apisAreAvailable } from "expo";APiCa

export const getProductdetail = (detail) => ApiCallGet(`${API_URL.product_detail}${detail}`, '').then(response => response);