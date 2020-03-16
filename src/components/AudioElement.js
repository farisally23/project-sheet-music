import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'


class AudioElement extends Component {
    
    state = {}

    render() {
        const filename = this.props.file.filename
        const source = require("../uploads/" + filename)
        return (
          <div>
            <div>{this.props.file.title}</div>
            <audio controls>
              <source src={source}  type="audio/mpeg" >
              </source>
          </audio>
          <Link to={{pathname: "/edit", state: {filename: filename}}}>Edit</Link>
          </div>
        )
      }
  }

  export default AudioElement