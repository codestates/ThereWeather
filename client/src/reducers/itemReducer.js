<<<<<<< HEAD
import { CHANGE_USER_INFO, CHANGE_USER_GENDER } from "../actions/index"
import { UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE, LOGGEDIN_USER, SIGNIN_USER, SIGNUP_USER } from "../actions/index"
=======
import { CHANGE_USER_INFO, CHANGE_USER_GENDER, CHANGE_IS_LOGIN, UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE, LOGIN_USER } from "../actions/index"
>>>>>>> a23b0cdc3636df9ecea569a78487b1c87f2f089a
import { initialState } from "./initialState"

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            }
            break;
        //     break
        // 새로운기능은 아래양식으로 만들어서 쓸수있다.

        case CHANGE_USER_GENDER:
            return {
                ...state,
                genderToggle: action.payload,
            }
            break;

        // case CHANGE_USER_INFO:
        //     break
        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
<<<<<<< HEAD
                current: action.payload
            } 
            break;
=======
                current: action.payload,
            }
>>>>>>> a23b0cdc3636df9ecea569a78487b1c87f2f089a
        case UPDATE_START_END_PAGE:
            return {
                ...state,
                start: action.payload.start,
                end: action.payload.end,
            }
<<<<<<< HEAD
            break;
        case LOGGEDIN_USER:
            return {
                ...state,
                userLoggedIn: {
                isLoggedIn: true,
                accessToken: action.accessToken,
                path: action.path
                },
            }
            break;
        case SIGNIN_USER:
            return {
                ...state, 
                userSignin: {
                    signIn: false,
                  }
            }    
            break;
        case SIGNUP_USER:
            return {
              ...state, 
              signUp: {
                signUpStatus: false
              }
            }
            break;
=======
        // case LOGIN_USER:
        //     return {
        //         ...state,
        //         loginSuccess: action.payload
        //     }

        case CHANGE_IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            }

>>>>>>> a23b0cdc3636df9ecea569a78487b1c87f2f089a
        default:
            return state
    }
}

export default itemReducer
