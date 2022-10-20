import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGOUT,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS
} from './types'
import axios from 'axios'

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') })

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify`, body, config)
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}


export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
};

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user())

        return res
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })

        return error.response

    }
};

export const signup = (username, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password, re_password })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        return res

    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL
        })

        return error.response
    }
};


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

export const getUnownedPokemon = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon/unownedpokemon/`, config)
            return res
        } catch (error) {
            return error
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const myPokemon = (id) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon/mypokemon/?id=` + id, config)
            return res
        } catch (error) {
            return error
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}


export const randomPokemon = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon/randompokemon/`, config)
            return res
        } catch (error) {
            return error
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const addPokemon = (id, ownedby) => async dispatch => {
    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const body = JSON.stringify({ id, ownedby })

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/pokemon/addpokemon/`, body, config);

            return res

        } catch (error) {

            return error.response
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
};

export const releasePokemon = (id) => async dispatch => {
    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const body = JSON.stringify({ id })

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/pokemon/releasepokemon/`, body, config);

            return res

        } catch (error) {

            return error.response
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
};
