import axios from "axios";
import {store} from '../store'

export function getUserInfo() {
    return async (dispatch) => {
        console.log(store.getState())
        let token = store.getState().authReducer.token
        axios.get('/user/data', {
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