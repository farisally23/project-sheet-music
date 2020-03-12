import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
    render() {
        // Token that tells us if user is logged in
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
          <div className="flex pa1 justify-between nowrap orange">
            <div className="flex flex-fixed black">
              <div className="fw7 mr1">CSCC09 Project</div>
              <Link to="/" className="ml1 no-underline black">
                Home
              </Link>
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to="/upload" className="ml1 no-underline black">
                    upload
                  </Link>
                </div>
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to="/recordings" className="ml1 no-underline black">
                    recordings
                  </Link>
                </div>
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to="/test" className="ml1 no-underline black">
                    test
                  </Link>
                </div>
            </div>
            <div className="flex flex-fixed">
              {authToken ? (
                // If authenticated, show logout button
                <div
                  className="ml1 pointer black"
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN)
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