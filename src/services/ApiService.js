import { BASE_URL } from "../config";

export async function ApiCallPost(path, formdata) {
    console.log('path', path)
    var ApiCallResposne = await ApiCall(path, formdata, "POST");
    // console.log('awaitApiCallResposne', ApiCallResposne)
    return ApiCallResposne;
}
export async function ApiCallGet(path, formdata) {
    console.log('path', path)
    var ApiCallResposne = await ApiCall(path, formdata, "GET");
    // console.log('awaitApiCallResposne', ApiCallResposne)
    return ApiCallResposne;
}
async function ApiCall(path, formdata, method) {
    // console.log('get Api Requirement')
    let ApiModules = await getApiRequirement(method, formdata);
    try {
        console.log(`${BASE_URL}${path}`)
        let Apiresponse = await fetch(`${BASE_URL}${path}`, ApiModules);
        // let Apiresponse = await fetch(`https://jsonplaceholder.typicode.com/todos/1`, ApiModules);

        let JSONResponse = await Apiresponse.json();
        console.log('JSONResponse', JSONResponse)
        return (JSONResponse);
    }
    catch (e) {
        console.log('error', e);
        return e;
    }
}

async function getApiRequirement(method, formdata) {
    const Headers = await getHeaders();
    var ApiModules = {}
    if (method == 'POST') {
        ApiModules = { method: method, headers: Headers, body:JSON.stringify(formdata) }
    }
    else {
        ApiModules = { method: method, }
    }
    // console.log('Api Modules', ApiModules)
    return ApiModules;
}
async function getHeaders() {
    let headers = {}
    // await get_From_AsyncStorage('@Auth_Token').then(token => {
    //     if (token == null) {
    headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'  
    }
    return headers;
}
