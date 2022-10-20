import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom"
import { connect } from "react-redux"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { signup } from "../actions/auth";
import '../stylesheet/login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountAcreated] = useState(false)
    const [validationMsg, setValidationMsg] = useState("")
    let [texto, setTexto] = useState([]);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: '',
    });

    const { username, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()

        if (password === re_password) {
            const signupres = signup(username, password, re_password)
            signupres.then((result) => {
                console.log(result)

                if (result.status === 400) {
                    const jsonRes = JSON.parse(result.request.response)

                    if (result.request.response.includes("password")) {
                        const jsonResToString = JSON.parse(result.request.response)
                        setTexto(jsonResToString.password)
                        setValidationMsg("")
                    } else if (result.request.response.includes("username")) {
                        const jsonResToString = jsonRes.username[0]
                        setValidationMsg(JSON.stringify(jsonResToString).substring(1, JSON.stringify(jsonResToString).length - 1))
                        setTexto([])
                    }
                }
                else {
                    toast.success("Account Succesfully Created!", {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    setAccountAcreated(true)
                }
            }).catch(err => console.log(err))
            setTexto([])
            setValidationMsg("Server error. Try again later")

        } else {
            setValidationMsg('Please make sure your passwords match.')

        }
    }

    //is the user authenticated?
    //redirect to home
    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={4}>
                    <div className="login-background">
                        <h1 className="header-name">Sign up</h1>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Username* "
                                    name="username"
                                    value={username}
                                    onChange={e => onChange(e)}
                                    required
                                />
                                <label>Password</label>

                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password*"
                                    name="password"
                                    value={password}
                                    minLength="6"
                                    onChange={e => onChange(e)}
                                    required
                                />
                                <label>Enter Password Again</label>

                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Confirm Password*"
                                    name="re_password"
                                    value={re_password}
                                    minLength="6"
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                            <p className="text-danger">
                                {validationMsg}

                            </p>
                            {texto.map((word, i) => (
                                <p className="text-danger" key={i}>{word}</p>
                            ))}
                            <button className="btn btn-dark" type="submit">Register </button>
                        </form>
                        <p>
                            Already have an account? <Link to='/login'>Log in</Link>
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

export default connect(mapStateToProps, { signup })(Signup);

