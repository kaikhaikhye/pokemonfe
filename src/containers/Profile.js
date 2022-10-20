import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"
import { connect } from "react-redux"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getUnownedPokemon, myPokemon, releasePokemon } from "../actions/auth";
import '../stylesheet/profile.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ load_user, releasePokemon, getUnownedPokemon, myPokemon, isAuthenticated }) => {
    const [unownedPokemon, setUnownedPokemon] = useState([])
    const [ownedPokemon, setOwnedPokemon] = useState([])

    const [pokemonFail, pokemonFailData] = useState("")

    useEffect(() => {

        getUnownedPokemon().then((result) => {
            if (result !== undefined) {

                if (result.status === 200) {
                    setUnownedPokemon(result.data)

                } else {
                    pokemonFailData("Failed to load Pokemon")
                }
            }

        }).catch(err => {
            console.log(err)
        })
        if (load_user !== null) {
            myPokemon(load_user.id).then((result) => {
                if (result !== undefined) {
                    if (result.status === 200) {
                        setOwnedPokemon(result.data)
                        console.log(result.data)

                    } else {
                        pokemonFailData("Failed to load Pokemon")
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        }

    }, [getUnownedPokemon, load_user, myPokemon])

    //is the user authenticated?
    //redirect to home
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    const releasePokemonClick = (pokemonid , pokemonname) => {
        const releasepokemonres = releasePokemon(pokemonid)
        releasepokemonres.then((result) => {
            console.log(result)

            if (result.status === 200) {
                toast.success(`You have released ${pokemonname}!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                myPokemon(load_user.id).then((result) => {
                    if (result !== undefined) {
                        if (result.status === 200) {
                            setOwnedPokemon(result.data)
                            console.log(result.data)
    
                        } else {
                            pokemonFailData("Failed to load Pokemon")
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            else {
                toast.error(`server error unable to release ${pokemonname}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }).catch(err => console.log(err))
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={3}>
                    <div className="column">
                        <h3>Profile</h3>
                        {load_user ? load_user.username : "cannot load user"}
                    </div>

                </Col>
                <Col xs={12} md={6}>
                    <div className="column">
                        <h3>Your Pokemon</h3>
                        {
                            ownedPokemon.length !== 0 ? <table className="pokemonTable" >
                                <tbody>
                                    <tr><th>Pokemon</th><th>HP</th><th>ATTACK</th><th>DEFENSE</th><th>LEVEL</th><th>TYPE</th><th>RELEASE</th></tr>
                                    <tr><td></td></tr>
                                    {ownedPokemon.map(ownedPokemon => <tr key={ownedPokemon.id}>
                                        <td>{ownedPokemon.name}</td>
                                        <td>{ownedPokemon.hp}</td>
                                        <td>{ownedPokemon.attack}</td>
                                        <td>{ownedPokemon.defense}</td>
                                        <td>{ownedPokemon.level}</td>
                                        <td>{ownedPokemon.type}</td>
                                        <td><button className="btn btn-danger small" onClick={() => releasePokemonClick(ownedPokemon.id,ownedPokemon.name)}>release</button></td></tr>)}

                                </tbody>
                            </table>
                                :
                                "You do not have any Pokemon"
                        }


                        {pokemonFail}
                    </div>
                </Col>
                <Col xs={12} md={3}>
                    <div className="column">
                        <h3>Unowned Pokemon</h3>
                        {unownedPokemon.length !== 0 ? unownedPokemon.map(unownedPokemon => <div key={unownedPokemon.name}>{unownedPokemon.name}</div>) : "You captured them all!"}

                        {pokemonFail}
                    </div>
                </Col>
            </Row>
        </Container >
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    load_user: state.auth.user
});

export default connect(mapStateToProps, { releasePokemon, myPokemon, getUnownedPokemon })(Profile);

