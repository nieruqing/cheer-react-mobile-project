import React, { Component } from 'react';
import { connect } from 'react-redux';
import './404.scss';
import {Header} from "../../component/head/header";
class NotFoundPage extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(()=>{
            window.history.back();
        },5000);
    }
    goToHistoryPage(){
        window.history.back();
    }
    render() {
        return (
            <div className={"not-found "+ this.props.getDeviceInfoDatas.iphonex}>
                <Header goback title='找不到页面'/>
                <div className="content-body">
                    <div className="content">
                        <i className="icon-not-found"></i>
                        <p>您当前访问的页面已经不存在，5秒后带您返回上个页面。</p>
                    </div>
                    <div className="plr30">
                        <button className="btn-full-center-yellow" id="NotFoundPageGoBack" onClick={this.goToHistoryPage.bind(this)}>立即返回</button>
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
const NotFoundPage404 = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotFoundPage);
export default NotFoundPage404;