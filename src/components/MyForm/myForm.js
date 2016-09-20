import React from "react";
import ReactDOM from "react-dom";


var ClickSubmit = function (info) {
    //    console.log(e);
    console.log(info);
};

var MyForm = React.createClass({

    propTypes: {
        // columns: React.PropTypes.array.isRequired
        // data: React.PropTypes.Array.isRequired
        // formSubmit: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return { name: 'haisa' }
    },
    handleChange: function (e) {
        this.setState({ name: e.target.value });
    },
    handleSubmit: function (e) {


        e.preventDefault();
        //    console.log(this.refs);
        var nameNode = ReactDOM.findDOMNode(this.refs.name);
        var name = nameNode.value;
        console.log(name);
        this.props.formSubmit({ name: name, password: "none" });

    },


    render: function () {
        // console.log(this.props.data);

        return (
            <div>
                <h2>My Form  e d f</h2>
                <form action="post" onSubmit={this.handleSubmit} >
                    <input type="text" value={this.state.name} onChange={this.handleChange} ref="name" />
                    <br />  <br />
                    <input type="password" ref="password" />
                    <button type="submit" onClick={ClickSubmit.bind(this, "hello") }>submit</button>
                </form>

            </div>
        );
    }

});

export default MyForm;