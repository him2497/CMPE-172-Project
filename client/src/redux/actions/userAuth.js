import axios from 'axios'

export function loginUser(email, password, history){
    email = String(email).toLowerCase();
    return async (dispatch) => {
        dispatch(authorizing())
        await axios.post('/auth/login', {
            "email": email, 
            "password": password
          }).then((res) => {
              console.log(res.data)
            if(res.data.info === "No user found."){
                dispatch(userNotAuthorized("No user found."))
            }else if(res.data.info === "Oops! Wrong password."){
                dispatch(userNotAuthorized("Oops! Wrong password."))
            }else if(res.data.info === "Success"){
                let token = res.data.token
                dispatch(userAuthorized(true, email, token))
                history.push('/dashboard')
            }
          }).catch(function (error) {
            dispatch(userNotAuthorized(error))
            console.log(error);
        });
    }
}

export function authorizing(){
    return async (dispatch) => {
        dispatch(startAuthorizing())
    }
}

// export function authorized(){
//     return async (dispatch) => {
//         dispatch(startAuthorizing())
//     }
// }


export function isAuthenticated(){
    return async (dispatch) => {
        await axios.get('/api/auth/isAuthenticated')
                .then((res) => {
                dispatch(userAuthorized(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export function logout(history) {
    return async(dispatch) => {
        await dispatch(userLogout())
        history.index = 0
        await history.push('/')
    }
}

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
  });

export const userAuthorized = (authorized, email, token) => ({
    type: 'USER_AUTHORIZED',
    authorized,
    email,
    token
});

export const userNotAuthorized = (error) => ({
    type: 'USER_NOT_AUTHORIZED',
    error
});

export const userVerification = (verified) => ({
    type: 'USER_VERIFIED',
    verified
})

export const userLogout = () => ({
    type: 'LOG_OUT_USER',
})