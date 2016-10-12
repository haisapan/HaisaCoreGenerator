import React, {Component, PropTypes} from 'react';
import jwt_decode from 'jwt-decode';

import Style from '../../../res/test.css';
Style.use();
// Style.unuse();

class Login extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login() {
        var userName=this.refs.userName.value;
        var password=this.refs.password.value;
        //HTTP ajax to login
    };


    render() {
        return (
            <div >
                Login
                <form action="">
                    <input name="userName" ref="userName" type="text"/>
                    <input name="password" ref="password" type="text"/>
                    <button onClick={this.login}>Login</button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {

};

export default Login;