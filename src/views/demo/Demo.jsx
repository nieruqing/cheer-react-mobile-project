import React, { Component } from 'react';
import './Demo.scss';
import {connect} from "react-redux";
import {getAppPlatformsDatas, setUserType} from "../../Redux/Action/nativeDatas/nativeDatas";
class DemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityImg:""
        }
    }
    componentDidMount(){
    }
    render() {
        return (
            <div>
                <div className="demo-page">
                    <button>测试</button>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return state;
}
function mapDispatchToProps(dispatch){
    return {
        _setUserType:(options) => {
            dispatch(setUserType(options));
        },
        _getAppPlatformsDatas: (id) => {//获取native的数据
            dispatch(getAppPlatformsDatas(id));
        },
    }
}
export  default
connect(
    mapStateToProps,
    mapDispatchToProps
)(DemoPage);