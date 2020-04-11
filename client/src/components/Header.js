import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import "../styles/Header.css"

class Header extends Component {
    render() {
        // Token that tells us if user is logged in
        const loggedIn = localStorage.getItem('currentUser')
        return (
          <div id="header">
            <div id="title"></div>

            <div id="routes">
                <Link to="/" className="route">
                  Home
                </Link>
              
                  <Link to={{pathname: "/upload", state: {user: loggedIn}}} className="route">
                    Upload
                  </Link>

                  <Link to="/explore" className="route">
                    Explore
                  </Link>

                  <Link to="/friends" className="route">
                    Friends
                  </Link>


            </div>



            <div id="login_logout">
              {loggedIn ? (
                // If authenticated, show logout button
                <div
                  className="route"
                  onClick={() => {
                    localStorage.removeItem('currentUser')
                    this.props.history.push(`/`)
                  }}
                >
                  Logout
                </div>
                // Else, show login button
              ) : (
                <Link to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        )
      }
}

export default withRouter(Header)