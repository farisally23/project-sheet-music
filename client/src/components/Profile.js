import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import Recordings from './Recordings'


class Profile extends Component {

    

    state = {
    }



    render() {
        const user = this.props.location.state.user;
        return (
        <div>
            <h2>{user}'s Profile</h2>
            <Recordings user={user}></Recordings>
        </div>
        
        )
    }

}

export default Profile