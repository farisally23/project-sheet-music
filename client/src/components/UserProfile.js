import React, { Component } from 'react'
import "../styles/Friends.css"
import { Query } from 'react-apollo'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import AddFriend from './AddFriend'
import Recordings from './Recordings'



class UserProfile extends Component {

    state = {
    }



    render() {
        const user = localStorage.getItem('currentUser')
        console.log(user);
        return (
            <div>
                <h3>Add Friend</h3>
                <AddFriend></AddFriend>

                <h3>My Audio</h3>
                <Recordings user={user}></Recordings>
            </div>
          
        )
    }

}

export default UserProfile