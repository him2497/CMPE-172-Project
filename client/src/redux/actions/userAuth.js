import axios from 'axios'

export function loginUser(email, password, history){
    email = String(email).toLowerCase();
    return async (dispatch) => {
        dispatch(authorizing())
        await axios.post('/auth/login', {
            "email": email, 
            "password": password
          }).then((res) => {
            if(res.data.info === "No user found."){
                dispatch(userNotAuthorized("No user found."))
            }else if(res.data.info === "Oops! Wrong password."){
                dispatch(userNotAuthorized("Oops! Wrong password."))
            }else if(res.data.info === "Success"){
                let token = res.data.token
                dispatch(userAuthorized(true, token))
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

export function authorized(token){
    return async (dispatch) => {
        dispatch(userAuthorized(true, token))
        dispatch(isAdmin(token))
    }
}


export function isAdmin(token){
    return async (dispatch) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        await axios.get('/check/access_control')
            .then((res) => {
                dispatch(userIsAdmin(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export function logout(history) {
    return async (dispatch) => {
        await dispatch(userLogout())
        history.index = 0
        await history.push('/')
    }
}

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
  });


export const userIsAdmin = (acl) => ({
    type: 'USER_ACCESS_CONTROL',
    acl
});


export const userAuthorized = (authorized, token) => ({
    type: 'USER_AUTHORIZED',
    authorized,
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