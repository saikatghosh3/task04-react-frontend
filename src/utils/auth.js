export const getAccessToken = ()=> {
    return localStorage.getItem('accessToken');
}

export const setAccesToken = (accessToken)=> {
    localStorage.setItem("accessToken", accessToken);
}
export const getRefreshToken = ()=> {
    return localStorage.getItem('refreshToken');
}

export const setRefreshToken = (refreshToken)=> {
    localStorage.setItem('refreshToken', refreshToken);
}

export const getUser = ()=>{
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch(_) {
        return null;
    }
}

export const setUser = (user)=> {
    try {
        localStorage.setItem('user', JSON.stringify(user));
    } catch(_) {
        localStorage.setItem('user', null);
    }
}