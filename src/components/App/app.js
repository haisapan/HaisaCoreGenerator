import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

import CoreTable from '../CoreTable/CoreTable';

import tableConfig from '../../../db.json';



const App = React.createClass({
    getInitialState() {
        return {
            columns: [],
            name: "haisa's name is great!",
        };
    },

    // childContextTypes: {
    //     disabled: React.PropTypes.string,
    // },
    // getChildContext() {
    //     return {
    //         disabled: 'true',
    //     };
    // },

    componentDidMount() {
        if (!this.isMounted()) {
            return;
        }
        setTimeout(() => {
            var columns = [{
                field: 'NO',
                title: '编号'
            }, {
                    field: 'NAME',
                    title: '名称'
                }];
            this.setState({ columns: columns });
        }, 5000);
    },
    changeName(item) {
        console.log(item);
    },
    componentWillMount() {
        // intervalTimer = null;
    },
    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return true;

    },

    render() {

        return (<div>

            <CoreTable config={tableConfig} />

            {this.props.children}

            {//<div>   {this.state.name + " ---test"}</div>}
                { // <div>
                    // <ul>
                    //     <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    //     {// <li><Link to="/datatable" activeStyle={{ color: 'green' }} >DataTable</Link></li>
                    //     // <li><Link to="/myform" activeStyle={{ fontSize: '24px' }}>My Form</Link></li>
                    //     }
                    // </ul>

                    // <input type="text"  />
                    // </div>
                }

    
        </div>);
    },
});

export default App;
