import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './components/App/app';
import DataTable from './components/DataTable/dataTable';
import MyForm from './components/MyForm/myForm';
        // {
// <IndexRoute component={MyForm} ></IndexRoute>
        // }
ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={App}>            
            <Route path="/datatable"  component={DataTable} ></Route>
            <Route path="/myform" component={MyForm}></Route>
        </Route>
    </Router>,
    document.getElementById('root')
);