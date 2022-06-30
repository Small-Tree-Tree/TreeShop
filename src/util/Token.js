// 存储token
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}

// 读取token
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}

// 清除token
export const clearToken = ()=>{
    localStorage.removeItem('TOKEN')
}

