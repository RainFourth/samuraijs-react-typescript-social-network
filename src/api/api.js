import * as axios from "axios";


// TODO сделать обработку некорректных запросов, а то промисы зависают

const baseUrl = "https://social-network.samuraijs.com/api/1.0/";

const ax = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "API-KEY": "99b838ca-9fd3-46f6-b97f-38fd123a4e39",
    },
});

//dalAPI

export const usersAPI = {
    getUsers(currPage = 1, pageSize = 10){
        return ax.get(`users?page=${currPage}&count=${pageSize}`).then(response => response.data);
    },

    follow(userId){
        // TODO если убрать /follow/ и получить ошибку, то промис не завершается
        const promise = ax.post(`follow/${userId}`).then(response => response.data);
        return promise
    },

    unfollow(userId){
        return ax.delete(`follow/${userId}`).then(response => response.data);
    },

    getUserProfile(userId){
        console.warn("Obsolete method. Please use profileAPI.getUserProfile(userId)")
        return profileAPI.getUserProfile(userId);
    },
}

export const profileAPI = {
    getUserProfile(userId){
        return ax.get(`profile/${userId}`).then(response => response.data);
    },

    getUserStatus(userId){
        return ax.get(`profile/status/${userId}`).then(response => response.data);
    },

    updateUserStatus(status){
        return ax.put(`profile/status`, {status: status}).then(response => response.data);
    },
}

export const authAPI = {
    me() {
        return ax.get(`auth/me`).then(response => response.data);
    },

    login(email, password, rememberMe = false){
        return ax.post(`auth/login`, {email, password, rememberMe}).then(response => response.data);
    },

    logout(){
        return ax.delete(`auth/login`).then(response => response.data);
    },

}



//GET DELETE - 2 параметра

//GET - get - получить что-то
//DELETE - delete - удалить кого-то - удалить из друзей например (отписаться)

/*
axios.get/delete("URL",
   {
       withCredentials: true,
       headers: {
          "API-KEY": "99b838ca-9fd3-46f6-b97f-38fd123a4e39",
       }
   })

*/




//POST PUT - 3 параметра

//POST - create - добавить кого-то в друзья (подписаться) - создать что-то
//PUT - update -

/*
axios.get/delete("URL", {},
   {
       withCredentials: true,
       headers: {
          "API-KEY": "99b838ca-9fd3-46f6-b97f-38fd123a4e39",
       }
   })

*/

//так как изначально сервер наш - это NodeJs на локалхосте, то для другого домена надо явно указать, чтобы отправлялись куки {withCredentials: true}

//ещё браузер перед основными запросами шлёт запрос OPTIONS, потому шлёт его на другой домен, чтобы серевер разрешил делать основной запрос
//а может и сразу сделать запрос
