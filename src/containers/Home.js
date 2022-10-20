import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from "react-redux"
import { addPokemon, randomPokemon } from "../actions/auth";
import Col from 'react-bootstrap/Col';
import '../stylesheet/profile.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = ({ load_user, addPokemon, isAuthenticated, randomPokemon }) => {
    const [pokemon, setPokemon] = useState([])
    const [pokemonFail, pokemonFailData] = useState("")
    const [randomNumber, setRandomNumber] = useState()
    const [guessMsg, setGuessMsg] = useState("")
    const [capturedMsg, setCapturedMsg] = useState("")
    const [captured, setCaptured] = useState(false)
    const [tries, setTries] = useState(3)

    var [submitted, setSubmitted] = useState(1)

    useEffect(() => {
        randomPokemon().then((result) => {
            if (result !== undefined) {
                if (result.status === 200) {
                    setPokemon(result.data)
                } else {
                    pokemonFailData("Failed to load Pokemon")
                }
            }
        }).catch(err => { console.log(err) })
        setRandomNumber(Math.floor(Math.random() * 10) + 1)
    }, [randomPokemon])


    function failtocapture() {
        window.location.reload()
    }
    const onSubmit = e => {
        e.preventDefault()
        console.log(randomNumber)
        if (e.target[0].value < randomNumber) {
            setGuessMsg("Your Guess, " + e.target[0].value + ", is too low.")
            setSubmitted(submitted + 1)
            setTries(tries - 1)
            if (submitted >= 3) {
                failtocapture()
            }

        } else if (e.target[0].value > randomNumber) {
            setGuessMsg("Your Guess, " + e.target[0].value + ", is too high.")
            setSubmitted(submitted + 1)
            setTries(tries - 1)

            if (submitted >= 3) {
                failtocapture()
            }
        } else {
            if (submitted <= 3) {
                setGuessMsg("")
                setCaptured(true)
                setCapturedMsg(`You have captured ${pokemon.name}`)
                const addpokemonres = addPokemon(pokemon.id, load_user.id)
                addpokemonres.then((result) => {
                    console.log(result)

                    if (result.status === 200) {
                        toast.success(`You have captured ${pokemon.name}!`, {
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
                    else {
                        toast.error("server error unable to catch pokemon", {
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
        }

    }


    const handleClick = (e) => {
        e.preventDefault();
        window.location.reload()
    }

    //is the user authenticated?
    //redirect to home
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    return (
        <Container>
            <Row>
                <Col className="column" md={12} >
                    <p>A wild</p>
                    <h4>{pokemon.name}{pokemonFail}</h4>
                    <p>has appeared!</p>
                    <h5>Pick a number between 1 and 10.
                        {tries === 1 ? " You have " + tries + " try left." : " You have " + tries + " tries left."} </h5>
                    <p className="text-danger">
                        {guessMsg}

                    </p>
                    <p className="text-success">
                        {capturedMsg}

                    </p>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <label>Guess the Number!</label>
                            <input
                                className="form-control wide"
                                type="number"
                                placeholder="Number"
                                name="number"
                                min="1"
                                max="10"
                                required
                            />
                            {!captured ? <button className="btn btn-dark" type="submit">Guess</button>
                                : <button className="btn btn-dark wide" onClick={handleClick} >Catch More Pokemon</button>
                            }
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    load_user: state.auth.user
});

export default connect(mapStateToProps, { randomPokemon, addPokemon })(Home);

