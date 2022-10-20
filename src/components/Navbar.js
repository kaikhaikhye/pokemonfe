import React, { Fragment } from "react";
import '../stylesheet/navbar.css';
import { logout } from '../actions/auth'
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const Navbar = ({ logout, isAuthenticated }) => {
    const guestlinks = () => (
        <Fragment>
            <li className="nav-item active">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
        </Fragment>

    );

    const authlinks = () => (

        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/">Catch Pokemon</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
            </li>
        </Fragment>

    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light py-4 bg-white">
            <h4 className="brand">Pokemon Reluvate</h4>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {isAuthenticated ? authlinks() : guestlinks()}
                </ul>
            </div>
        </nav>
    )


}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);