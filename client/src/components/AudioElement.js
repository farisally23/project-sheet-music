import React, { Component } from 'react'
import "../styles/AudioElement.css"
import { Link } from 'react-router-dom'


class AudioElement extends Component {
    
    state = {}


    render() {
        const filename = this.props.file.filename
        const source = require("../uploads/" + filename)
        return (
          <div id="audio_container">
            <div className="audio_element">
              <div className="audio_title">{this.props.file.title}</div>
              <div>
              <audio className="player" controls>
                <source src={source}  type="audio/mpeg" >
                </source>
              </audio>
              </div>
              
            <Link to={{pathname: "/edit", state: {filename: filename}}}>More</Link>
            </div>
          </div>
          
        )
      }
  }

  export default AudioElement