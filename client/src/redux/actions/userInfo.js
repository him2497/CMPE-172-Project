import axios from "axios";
import {store} from '../store'

export function getUserInfo() {
    return async (dispatch) => {
        let token = store.getState().authReducer.token
        axios.get(process.env.REACT_APP_API_URL+'/user/data', {
            'headers': {
                'Authorization': 'Bearer ' + token
              }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getUserProfile = (data) => ({
    type: 'GET_USER_PROFILE',
    data
});