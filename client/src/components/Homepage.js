import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


class Homepage extends Component {

    state = {}


    render() {
        const loggedIn = localStorage.getItem('currentUser');
        return (
            <div id="greeting">{loggedIn ? "Welcome " + loggedIn + "!" : 
            "Welcome to The Audio App! Create an account to get started"}</div>
            )
    }

}

export default Homepage