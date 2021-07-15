import {createSelector} from "reselect";

// примитивный селектор
export const getUsers = (state) => {
    return state.users.users;
}
/*export const isFetched = (state) => {
    return !state.users.isFetching;
}*/

// можно передавть массив примитивных селекторов или один селектор или через запятую указывать селекторы
// соответсвенно если результат простого селектора не изменился (по ссылке) - сложный не запускается
export const getUsersSelector = createSelector( getUsers, /*isFetched,*/ (users/*, isFetched*/) => {
    //console.log(users);
    //console.log(isFetched);

    return users.filter(u => true);
})





export const getPageSize = (state) => {
    return state.users.pageSize;
}
export const getTotalUsersCount = (state) => {
    return state.users.totalUsersCount;
}
export const getCurrPage = (state) => {
    return state.users.currentPage;
}
export const isFetching = (state) => {
    return state.users.isFetching;
}
export const getFollowedUserIds = (state) => {
    return state.users.followingUserIds;
}
