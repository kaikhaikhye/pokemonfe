import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom"
import { connect } from "react-redux"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { login } from "../actions/auth";
import '../stylesheet/login.css';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [validationMsg, setValidationMsg] = useState("")

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()

        const loginres = login(username, password)
        loginres.then((result) => {
            if (result.status === 401) {
                setValidationMsg(result.data.detail)
            }


        }).catch(err => console.log(err))

    }

    //is the user authenticated?
    //redirect to home
    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={4}>
                    <div className="login-background">
                        <h1 className="header-name">Sign in</h1>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={username}
                                    onChange={e => onChange(e)}
                                    required
                                />
                                <label>Password</label>

                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    minLength="6"
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <p className="text-danger">
                                {validationMsg}

                            </p>
                            <button className="btn btn-dark" type="submit">Login</button>
                        </form>
                        <p>
                            Don't have an account? <Link to='/signup'>Sign Up</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>

    );

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);

