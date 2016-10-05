import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

import CoreDataTable from '../CoreDataTable/CoreDataTable';

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
                   <CoreDataTable config={tableConfig.coreTable}></CoreDataTable>
            {this.props.children}
        </div>


        );
    },
});

export default App;
