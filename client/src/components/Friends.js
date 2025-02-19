import React, { Component } from 'react'
import "../styles/Friends.css"
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'


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
      (function refresh(){
        setTimeout(function(e){
            refresh();
        }, 2000);
    }());
        return (
          <div id="friend_container">
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
                <div className="friend_name" key={friend._id}>{friend.username}
                  <Link className="friend_link" to={{pathname: "/profile", state: {user: friend.username}}} user={friend._id}>View Profile</Link>
                </div>
                    )}
                </div>
              )
            }}
          </Query>
        </div>
        )
    }

}

export default Friends