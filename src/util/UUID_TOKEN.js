import { v4 as uuidv4 } from 'uuid';
// 需要判断本地存储是否存在uuid
const getUUID = ()=>{
    let uuid_token = localStorage.getItem('UUID')
    // 如果不存在则添加
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUID',uuid_token)
    }
    return uuid_token
}

export default getUUID