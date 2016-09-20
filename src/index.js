import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './components/App/App';
// import DataTable from './components/DataTable/dataTable';
// import MyForm from './components/MyForm/myForm';
// {

// }
ReactDOM.render(
    <Router history={browserHistory} >
        <Route path="/" component={App}>
            {
                // <IndexRoute component={MyForm} ></IndexRoute>
                // <Route path="/datatable"  component={DataTable} ></Route>
                // <Route path="/myform" component={MyForm}></Route>
            }
        </Route>
    </Router>,
    document.getElementById('root')
);