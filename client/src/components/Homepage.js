import React, { Component } from 'react'
import "../styles/AudioUpload.css"


class Homepage extends Component {

    state = {}


    render() {
        const loggedIn = localStorage.getItem('currentUser');
        return (
            <h2 id="greeting">{loggedIn ? "Welcome " + loggedIn + "!" : 
            "Welcome to The Audio App! Create an account to get started"}</h2>
            )
    }

}

export default Homepage