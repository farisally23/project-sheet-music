import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

class PlayAudio extends Component {
    constructor(props) {
      super(props);
      this.state={ selectedColor: "green"}
      this.chooseSound = (color) => this.setState({selectedColor: color});
      this.playAudio = () => {
                  this.green.play();
                                         }
      }
        
    render() {
      return (
        <div className="stage">
          {/* <audio ref={(green) => { this.green = green; }}>
              <source src={`${require('../uploads/water.mp3')}`} type="audio/mpeg" >
              </source>
          </audio> */}
          <audio ref={(blue) => { this.blue = blue; }}>
              <source src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"type="audio/mpeg" >
              </source>
          </audio>
          <audio ref={(pink) => { this.pink = pink; }}>
              <source src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3" type="audio/mpeg" >
              </source>
          </audio>
          <audio ref={(yellow) => { this.yellow = yellow; }}>
              <source src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" type="audio/mpeg" >
              </source>
          </audio>
          
              <button className="btn btn-info" onClick={this.playAudio}>test sound</button>
        </div>
      );
    }
  }

  export default PlayAudio