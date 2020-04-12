import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Query } from 'react-apollo'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import Profile from './Profile'
import AddFriend from './AddFriend'


const GET_FRIENDS = gql`
query($username: String!) {
  getUsersFriends(username: $username) {
      _id
      username
      email
  }
}
`


class Friends extends Component {

    state = {
    }



    render() {
        return (
          <div>
            <Query query={GET_FRIENDS}
            variables={{username: localStorage.getItem('currentUser')}}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
        
              const friends = data.getUsersFriends
        
              return (
                <div>
                    <h2>My Friends:</h2>
                  {friends.map(friend => 
                <div key={friend._id}>{friend.username}
                  <Link to={{pathname: "/profile", state: {user: friend.username}}} user={friend._id}>View Profile</Link>
                </div>
                    )}
                </div>
              )
            }}
          </Query>

            <h3> Add Friend</h3>
          <AddFriend></AddFriend>
        </div>
        )
    }

}

export default Friends