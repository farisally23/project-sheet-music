import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'


// THIS IS HOW TO PLAY AUDIO
{/* <audio ref={(green) => { this.green = green; }}>
              <source src={`${require('../uploads/water.mp3')}`} type="audio/mpeg" >
              </source>
          </audio>  */}
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
          </div>
        )
      }
  }

  export default AudioElement