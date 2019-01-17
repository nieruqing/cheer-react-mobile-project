import {PLATFORMS_DATAS,USER_TYPE} from '../../Action/nativeDatas/nativeDatas';
import objectAssign from 'object-assign';
//获取第三方平台的数据
const _getAppPlatformsData={
    authHeader:{
        userToken:"",//用户token
        phoneX:false//设备类型
    }
};
const getAppPlatformsData=sessionStorage.getItem('getAppPlatformsDatas')?JSON.parse(sessionStorage.getItem('getAppPlatformsDatas')):_getAppPlatformsData;
const getAppPlatformsDatas = (state = getAppPlatformsData, action = {}) => {
    switch(action.type){
        case PLATFORMS_DATAS:
            sessionStorage.setItem('getAppPlatformsDatas',JSON.stringify(objectAssign({},state,action.options)));
            return objectAssign({},state,action.options);
        default:
            return state
    }
};

//android 原生的时候是否注册过
const isInitInfo={
    YHAuthorizeinit:"0",//android 原生的时候是否注册过，android多次注册会发生错误，1已注册过，不在注册
};
const setUserType = (state = isInitInfo, action = {}) => {
    switch(action.type){
        case USER_TYPE:
            return objectAssign({},state,action.options);
        default:
            return state
    }
};
export {
    getAppPlatformsDatas,setUserType
} ;
