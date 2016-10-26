import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

import CoreDataTable from '../CoreDataTable/CoreDataTable';

import tableConfig from '../../../coreTable-config.json';

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
    },
    changeName(item) {
        console.log(item);
    },
    componentWillMount() {
        // intervalTimer = null;
    },
    // shouldComponentUpdate(nextProps, nextState, nextContext) {

    //     return true;

    // },

    render() {

        return (<div>
            {/*<Link to="/login">login</Link>*/}
            <CoreDataTable config={tableConfig.coreTable} SearchBarExtension={null} ToolBarExtension={null}></CoreDataTable>
            {this.props.children}
        </div>


        );
    },
});

export default App;
