import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';

import CoreTable from '../CoreTable/CoreTable';
import CoolDataTable from '../CoolDataTable/CoolDataTable';

import tableConfig from '../../../db.json';

// console.log(tableConfig);


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

            {
                // <CoreTable config={tableConfig.coreTable}  />
            }
<CoolDataTable></CoolDataTable>
            {this.props.children}
        </div>


        );
    },
});

export default App;
