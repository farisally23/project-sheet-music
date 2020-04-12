import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


const ADD_FRIEND = gql`
  mutation addFriend($username: String!, $friend: String!) {
    addFriend(username: $username, friend: $friend) {
      path
      message
    }
  }
`


class AddFriend extends Component {

    

    state = {
        friend: ""
    }



    render() {
        const {friend} = this.state
        return (
        <div>
            If you know a friend's username, you can add them here:
            <form onSubmit={e => e.preventDefault()}>
            <input
            value={friend}
            onChange={e => this.setState({ friend: e.target.value })}
            type="text"
            placeholder="Enter friend's username"
            required/>
                <Mutation 
                mutation={ADD_FRIEND} 
                variables={{username: localStorage.getItem('currentUser'), friend: friend }}
                onCompleted={data => this._handleAddedFriend(data)}>
                    {add => <input type="submit" onClick={add}></input>}
                </Mutation>
            </form>
            <div id="success_box"></div>
            <div id="error_box"></div>
        </div>
        
        )
    }

    _handleAddedFriend = async data => {
        let success_box = document.getElementById('success_box')
        let error_box = document.getElementById('error_box')
        if(!data.addFriend) {
            error_box.innerHTML = ""
            success_box.innerHTML = "Friend added successfully"
        }
        else {
            let errorMessage = data.addFriend[0].message;
            success_box.innerHTML = ""
            error_box.innerHTML = errorMessage
        }
    }

}

export default AddFriend