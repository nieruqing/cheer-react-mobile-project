import React, { Component } from 'react';
import { connect } from 'react-redux';
import './sysError.scss';
import {Header} from "../../component/head/header";
class sysError extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    goToRefresh(){
        window.history.back();
    }
    render() {
        return (
            <div className={"error-sys "+ this.props.getDeviceInfoDatas.iphonex}>
                <Header goToApp msgIndex="14" title='开小差了'/>
                <div className="content-body">
                    <div className="content">
                        <i className="icon-error"></i>
                        <p>系统开小差了，点击下面的“刷新”按钮试试。</p>
                    </div>
                    <div className="plr30">
                        <button className="btn-full-center-yellow" id="sysErrorRefresh" onClick={this.goToRefresh.bind(this)}>刷新</button>
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
const sysErrorPage= connect(
    mapStateToProps,
    mapDispatchToProps
)(sysError);
export default sysErrorPage;