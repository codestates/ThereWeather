import { CHANGE_USER_INFO, CHANGE_USER_GENDER } from "../actions/index"
import { UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE, LOGGEDIN_USER, SIGNIN_USER, SIGNUP_USER } from "../actions/index"
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
                current: action.payload
            } 
            break;
        case UPDATE_START_END_PAGE:
            return {
                ...state, 
                start: action.payload.start,
                end: action.payload.end
            }
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
        default:
            return state
    }
}

export default itemReducer
