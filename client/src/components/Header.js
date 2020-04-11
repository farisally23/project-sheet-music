import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
    render() {
        // Token that tells us if user is logged in
        const loggedIn = localStorage.getItem('currentUser')
        return (
          <div className="flex pa1 justify-between nowrap orange">
            <div className="flex flex-fixed black">
              <div className="fw7 mr1">CSCC09 Project</div>
              <Link to="/" className="ml1 no-underline black">
                Home
              </Link>
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to={{pathname: "/upload", state: {user: loggedIn}}} className="ml1 no-underline black">
                    upload
                  </Link>
                </div>
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to="/explore" className="ml1 no-underline black">
                    explore
                  </Link>
                </div>
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to="/friends" className="ml1 no-underline black">
                    friends
                  </Link>
                </div>
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to="/addfriend" className="ml1 no-underline black">
                    add friend
                  </Link>
                </div>
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to="/record" className="ml1 no-underline black">
                    record
                  </Link>
                </div>
            </div>



            <div className="flex flex-fixed">
              {loggedIn ? (
                // If authenticated, show logout button
                <div
                  className="ml1 pointer black"
                  onClick={() => {
                    localStorage.removeItem('currentUser')
                    this.props.history.push(`/`)
                  }}
                >
                  logout
                </div>
                // Else, show login button
              ) : (
                <Link to="/login" className="ml1 no-underline black">
                  login
                </Link>
              )}
            </div>
          </div>
        )
      }
}

export default withRouter(Header)