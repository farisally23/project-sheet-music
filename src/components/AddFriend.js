import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import Recordings from './Recordings'


class AddFriend extends Component {

    

    state = {
        friend: ""
    }



    render() {
        return (
        <div>
            If you know a friend's username, you can add them here:
        </div>
        
        )
    }

}

export default AddFriend