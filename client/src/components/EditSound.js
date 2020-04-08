import React, { Component } from 'react'
import "../styles/EditAudio.css"
import { Query } from 'react-apollo'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import Profile from './Profile'
import Script from 'react-load-script'
import Pizzicato from 'pizzicato'


class EditSound extends Component {

    constructor(props) {
        super(props);
        this.playAudio = this.playAudio.bind(this);
        this.pauseAudio = this.pauseAudio.bind(this);
      } 

    state = {
        loaded: false,
        audio: null,
        volume: 10,
        frequency: 10,
        peak: 10
    }

    componentDidMount() { 
        let currentComponent = this;
        //props.location.state.filename originated from AudioElement.js
        const source = require("../uploads/" + this.props.location.state.filename)

        var sound = new Pizzicato.Sound({ 
            source: 'file',
            options: { path: source }
        }, function() {
            currentComponent.setState({audio: sound})
            currentComponent.setState({loaded: true})
        });
    }



    // Takes a Pizzicato sound object and plays it
    playAudio() {
        const audio = this.state.audio
        audio.play();
    }

    pauseAudio() {
        const audio = this.state.audio
        audio.pause();
    }
    

    render() {
    
        const {loaded, audio} = this.state

        return (
            
            <div>
                {loaded ?
                <div>
                <button onClick={this.playAudio}>Click to Play</button>
                <button onClick={this.pauseAudio}>Pause</button>
                <div class="slidecontainer">
                    <label for="volume_slider">Volume</label>
                    <input type="range" id="volume_slider" class="slider" name="volume_slider" min="0" max="10"
                        onChange={e => this.setState({ volume: e.target.value })}/>
                    <div>{this.state.volume}</div>

                    <label for="frequency_slider">Frequency</label>
                    <input type="range" id="frequency_slider" class="slider" name="frequency_slider" min="0" max="10"
                        onChange={e => this.setState({ frequency: e.target.value })}/>
                    <div>{this.state.frequency}</div>

                    <label for="peak_slider">Peak</label>
                    <input type="range" id="peak_slider" class="slider" name="peak_slider" min="0" max="10"
                        onChange={e => this.setState({ peak: e.target.value })}/>
                    <div>{this.state.peak}</div>
                </div>
            </div>
            
            // Not loaded
            :<div>loading</div>}
            </div>
            
        )
        }

}

export default EditSound