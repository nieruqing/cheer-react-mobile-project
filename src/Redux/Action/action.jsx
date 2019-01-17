import fetch from 'isomorphic-fetch';
import {hostName,target} from '../../config/Config';
import {Tool} from '../../component/global/global';
import Promise from 'promise-polyfill';
import { Toast} from 'antd-mobile';
if (!window.Promise) {
    window.Promise = Promise;
}
//数据请求(POST)
export const postDatas = (path,authHeader, postData, success,name,propsParam) => {
    let targets ="";
    // if(process.env.NODE_ENV =="development"){
    //     targets =target;
    // }else{
    //     targets =Tool.target;
    // }
    targets =target;
    let url = targets + path;//请求地址
    let preventMountSubmit = true;//防重提交
    let postParms = {};
    if(name == "uploadCardFrontImage" || name == "uploadCardBackImage" || name == "uploadCardLicenseImage"){
        postParms ={
            method: 'POST',
            body: postData,
            headers: {
                'Auth-Header':JSON.stringify(authHeader)
            },
            mode: 'cors'
        }
    }else{
        postParms = {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Auth-Header':JSON.stringify(authHeader)
            },
            mode: 'cors'
        };
    }
    return dispatch => {
        Toast.loading('Loading...', 1, () => {
        return fetch(url,postParms)
            .then(response=>response.json())
            .then(json =>{

                    if(preventMountSubmit){
                        if(name =="login" || name =="register" || name=="applyloan" || name =="modifyBankCard" || name=="personCenter" || name=="paySource" || name == "orderPayment"){
                            if(json.code=="0"){
                                preventMountSubmit = false;
                            }else{
                                preventMountSubmit = true;
                            }
                            success(json);
                        }else {
                            if(json.code=="0"){
                                preventMountSubmit = false;
                                success(json);
                            }else{
                                preventMountSubmit = true;
                                Tool.alertSimple(json.message,'好的');
                            }
                        }
                    }

            })
            .catch(error =>{getDataFail(error,path,authHeader, postData, success,name,propsParam)})
        });
    }
};
//获取数据失败
const getDataFail = (error,path,authHeader, postData, success,name,propsParam) => {
    // if(name != "uploadDeviceInfo") {
    //     Tool.Loading(false);
    // }
    let paramsObj = {
        path:path,
        authHeader:authHeader,
        postData:postData,
        success:success,
        name:name,
        propsParam:propsParam
    };
    if(process.env.NODE_ENV =="development"){
        Tool.alertSimple('系统正在维护中，请稍后再试','好的');
        //Tool.alertSimple('系统正在维护中，请稍后再试','好的',paramsObj);
    }else{
        window.paramsObj = paramsObj;
        YHAuthorize.callHandler('SDK_TestNetWork',hostName,(resp) => {
            if(resp.status == "1000") {
                if(window.paramsObj.name =="personCenter" || window.paramsObj.name =="paySource"){
                    let objParams = {
                        closeSDK:"action"
                    };
                    Tool.alertSimple('系统正在维护中，请稍后再试','好的',objParams);
                }else{
                    Tool.alertSimple('系统正在维护中，请稍后再试','好的');
                }
                // Tool.alertSimple('系统正在维护中，请稍后再试','好的',window.paramsObj);
            }else{
                // window.history.back();
                Tool.alertNoWifi(window.paramsObj);
            }
        });
    }

};
//开发环境模拟数据接口
export const postDataNew = (path, postData, success,name) => {
    let url = target + path;//请求地址
    return dispatch => {
        return fetch(url,{
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(json =>{success(json)})
            .catch(error => console.log(error))
    }
};
//其他
export const getDataNew = (path, postData, success, name) => {
    let url = Tool.target + path;
    return dispatch => {
        return fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Header':JSON.stringify({})
            },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(json =>{success(json)})
            .catch(error => console.log(error))
    }
};
//手动调用获取数据的aciton
export const postDataQuickPayment= (path, postData, success) => {
    let url = path;
    return dispatch => {
        return fetch(url,{
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(json =>{success(json)})
            .catch(error => console.log(error))
    }
};
