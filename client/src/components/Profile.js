import React, { Component } from 'react'
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