import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './Redux/Store/Store';
import {HashRouter as Router,Route,Switch} from "react-router-dom"
import './config/Config.js';//引入默认配置
import './style/global.scss';
import DemoPage from "./views/demo/Demo";
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={DemoPage}/>
            </Switch>
        </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);
