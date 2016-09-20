import React from 'react';
import ReactDOM from "react-dom";
import { Link, IndexLink } from 'react-router';


// import MyForm from '../MyForm/myForm';


let dataList = [
    {
        id: 1,
        name: '#1 item',
    },
    {
        id: 2,
        name: '#2 item',
    },
];

const App = React.createClass({
    getInitialState() {
        return {
            columns: [],
            name: "haisa's name is great!",
        };
    },

    childContextTypes: {
        disabled: React.PropTypes.string,
    },
    getChildContext() {
        return {
            disabled: 'true',
        };
    },

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
        // console.log("should update?");
        return true;
        if (this.props.name == nextProps.name) {
            console.log('same props name:' + this.props.name);
            return false;
        }
        console.log(nextProps);
        console.log(nextState);
        return true;
    },

    render() {
        // var columns = [{
        //     field: 'NO',
        //     title: '编号'
        // }, {
        //         field: 'NAME',
        //         title: '名称'
        //     }];

        return (<div>
            <div>   {this.state.name + " ---test"}</div>
            <div>
                <ul>
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li><Link to="/datatable" activeStyle={{ color: 'green' }} >DataTable</Link></li>
                    <li><Link to="/myform" activeStyle={{ fontSize: '24px' }}>My Form</Link></li>
                </ul>

 <input type="text"  />
            </div>
            {
                (new Date()).toTimeString()
                // <MyForm formSubmit={(item) => this.changeName(item) } />
            }
            {

                this.props.children
                //     <window.ESAPP name="esApp" data={dataList}  />

                //     <div>hello {this.state.name} </div>
                //          {
                //     // <window.DataTable columns={this.state.columns} >
                //     //     <span>this is the test dataTable</span>
                //     //     <h4>footer is here</h4>
                //     // </window.DataTable>
                // }
                // <window.MyForm formSubmit={(item) => this.changeName(item) } />
                // {
                //     (new Date()).toTimeString()
                // }
            }
        </div>);
    },
});

// ReactDOM.render(<App name='haisa pan love xiaoxiao & youyou' />, document.getElementById('root'))
// var intervalTimer = setInterval(function () {

// },

//     1000
// )
export default App;
