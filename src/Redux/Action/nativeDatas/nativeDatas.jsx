//获取native的数据
const PLATFORMS_DATAS = 'PLATFORMS_DATAS';
const getAppPlatformsDatas = (options) => {
    return{
        type:PLATFORMS_DATAS,
        options
    }
};
export {PLATFORMS_DATAS,getAppPlatformsDatas};

const USER_TYPE = 'USER_TYPE';

const setUserType = (options) => {
    return{
        type:USER_TYPE,
        options
    }
};
export {USER_TYPE,setUserType};