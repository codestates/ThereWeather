//import axios from "axios"

// action types
export const CHANGE_USER_INFO = "CHANGE_USER_INFO"
export const CHANGE_USER_GENDER = "CHANGE_USER_GENDER"
export const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE"
export const UPDATE_START_END_PAGE = "UPDATE_START_END_PAGE"
export const CHANGE_IS_LOGIN = "CHANGE_IS_LOGIN"

// export const LOGIN_USER = "LOGIN_USER"

// actions creator functions

export const changeUser = (userinfo) => {
    return {
        type: CHANGE_USER_INFO,
        payload: {
            ...userinfo,
        },
    }
}
export const updateCurrentPage = (current) => {
    return {
        type: UPDATE_CURRENT_PAGE,
        payload: {
            current,
        },
    }
}
export const updateStartEndPage = (start, end) => {
    return {
        type: UPDATE_START_END_PAGE,
        payload: {
            start,
            end,
        },
    }
}
// export const loginUser = (data) => {
//   const loginDate = axios.post("http://localhost:3000/login", data)
//   .then(res => res.data)
//   return {
//       type: LOGIN_USER,
//       payload: loginDate
//   }
// }

export const changeGender = (usergender) => {
    return {
        type: CHANGE_USER_GENDER,
        payload: usergender,
    }
}
export const changeIsLogin = (trueOrFalse) => {
    return {
        type: CHANGE_IS_LOGIN,
        payload: trueOrFalse,
    }
}
