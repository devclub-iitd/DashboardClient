import { ACCESS_TOKEN_KEY,SELF_URL,SERVER_URL as BASE} from "./Constant";

export const Login = {
    serverAuth: () => BASE+"/user/github_login",
    redirectURI: () => "github_oauth",
    fullRedirectURI: () => `${SELF_URL}/github_oauth`,
    githubLogin: (client_id,redirect_uri) => createQueryURL("https://github.com/login/oauth/authorize",{client_id,redirect_uri,allow_signup: false,scope:'user:email'})
}

export const User = {
    getAll: () => BASE + "/user",
    get: (id) => BASE + `/user/${id}`,
    put: (id) => BASE + `/user/${id}`,
}

export const Project = {
    getAll: () => BASE + "/project",
    get: (id) => BASE + `/project/${id}`,
    put: (id) => BASE + `/project/${id}`
}

export const Item = {
    getAll: () => BASE + "/item",
    get: (id) => BASE + `/item/${id}`,
    put: (id) => BASE + `/item/${id}`
}

export const Event = {
    getAll: () => BASE + "/event",
    get: (id) => BASE + `/event/${id}`,
    put: (id) => BASE + `/event/${id}`
}

export const createQueryURL = (urlString,params={}) => {
    const url = new URL(urlString);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return url.toString();
}

const makeRequest = (method,urlString,params={},body={}) => {
    const url = createQueryURL(urlString,params);
    const options = {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem(ACCESS_TOKEN_KEY),
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer" // no-referrer, *client
    };

    if(method !== "GET") {
        options.body = JSON.stringify(body); // body data type must match "Content-Type" header
    }

    return fetch(url, options)
    .then(response => {
        if(!response.ok) {
            return response.json().then((resp)=> {throw new Error(resp.message);})
        }
        return response;
    })
    .then(response => response.json()) // parses JSON response into native Javascript objects
}

export const getRequest = (url, params = {}) => makeRequest("GET",url,params);
export const postRequest = (url, params = {}, body={}) => makeRequest("POST",url,params,body);
export const putRequest = (url, params = {}, body={}) => makeRequest("PUT",url,params,body);

export const createBasicHooks = (api,model) => {
    const getAll = () => {
        return getRequest(api.getAll())
        .then((result)=>model.parse(result.data));
    }
    
    const get = (id) => {
        return getRequest(api.get(id))
        .then((result)=>new model(result.data));
    }
    
    const update = (id,data) => {
        console.log(`id: ${id} url: ${api.put(id)}`);
        return putRequest(api.put(id),{},data)
        .then((result)=>new model(result.data));
    }
    return {getAll,get,update}
}