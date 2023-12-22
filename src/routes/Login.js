import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../services/readerService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value);
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        console.log('username: ' + this.state.username)
        console.log('password: ' + this.state.password)
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                // this.props.readerLoginSuccess(data.reader);
                this.setState({
                    errMessage: data.message

                })
            }
            if (data && data.errCode === 0) {
                this.props.readerLoginSuccess(data.reader);
                console.log('Login success')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }

        }
    }
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type="text" className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className='col-12 form-group login-input login-password-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                {/* <i class="far fa-eye"></i> */}
                                <input type="password" className='form-control'
                                    placeholder='Enter your password'
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                />
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12'>
                            <span className='text-center text-other mt-3'>Or Login with:</span>

                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g g-icon"></i>
                            <i className="fab fa-facebook-f f-icon"></i>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // readerLoginFail: () => dispatch(actions.readerLoginFail()),
        readerLoginSuccess: (readerInfo) => dispatch(actions.readerLoginSuccess(readerInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
