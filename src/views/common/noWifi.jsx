import React, { Component } from 'react';
import { connect } from 'react-redux';
import './noWifi.scss';
import {Header} from "../../component/head/header";
import { Tool } from '../../component/global/global';
class noWifi extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state ={
            text:Object//引导内容
        }
    }
    componentDidMount() {
        let texts;
        if(Tool.isPlatform() == "ios"){
            texts=(
                <div className="guide">
                    <p>请按照以下方法检查网络连接：</p>
                    <p>1. 打开手机“设置”，使“无线局域网”开关保持开启状态。</p>
                    <p>2. 打开手机“设置”-“蜂窝移动网络”，使“蜂窝移动网络”开关保持开启状态。</p>
                    <p>3. 如果仍无法连接网络，请检查手机接入的“无线局域网”是否已接入互联网或咨询网络运营商。</p>
                    <p>4. 设置完成后，点击“刷新”继续操作。</p>
                </div>
            );
        }else{
            texts=(
                <div className="guide">
                    <p>请按照以下方法检查网络连接：</p>
                    <p>1. 打开手机“设置”，使“WLAN”开关保持开启状态。</p>
                    <p>2. 打开手机“设置”，使“数据网络”开关保持开启状态。</p>
                    <p>3. 如果仍无法连接网络，请检查手机接入的“无线局域网”是否已接入互联网或咨询网络运营商。</p>
                    <p>4. 设置完成后，点击“刷新”继续操作。</p>
                </div>
            );
        }
        this.setState({
            text:texts
        });
    }
    goToRefresh(){
        window.history.back();
    }
    render() {
        return (
            <div className={"no-wifi "+ this.props.getDeviceInfoDatas.iphonex}>
                <Header goback title='网络不稳定'/>
                <div className="content-body">
                    <div className="content">
                        <i className="icon-no-wifi"></i>
                        {this.state.text}
                    </div>
                    <div className="plr30">
                        <button className="btn-full-center-yellow" id="noWifiRefresh" onClick={this.goToRefresh.bind(this)}>刷新</button>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch) {
    return {
        // _getData: (path, postData, success, name)=> {
        //     dispatch(getDataNew(path, postData, success, name));
        // }
    }
}
const noWifiPage= connect(
    mapStateToProps,
    mapDispatchToProps
)(noWifi);
export default noWifiPage;