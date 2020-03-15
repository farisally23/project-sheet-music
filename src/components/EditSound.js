import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Query } from 'react-apollo'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import Profile from './Profile'
import Script from 'react-load-script'
import {Howl, Howler} from 'howler';
import Pizzicato from 'pizzicato'


class EditSound extends Component {

    constructor(props) {
        super(props);
        this.playAudio = this.playAudio.bind(this);
        this.pauseAudio = this.pauseAudio.bind(this);
      } 

    state = {
        loaded: false,
        audio: null
    }

    componentDidMount() { 
        let currentComponent = this;
        // var sound = new Pizzicato.Sound({ 
        //     source: 'file',
        //     options: { path: require('../uploads/asploosh.mp3') }
        // })

        var sound = new Pizzicato.Sound({ 
            source: 'file',
            options: { path: require('../uploads/asploosh.mp3') }
        }, function() {
            console.log('sound file loaded!');
            currentComponent.setState({audio: sound})
            currentComponent.setState({loaded: true})
        });
    }



    // Takes a Pizzicato sound object and plays it
    playAudio() {
        console.log("Im running")
        const audio = this.state.audio
        audio.play();
    }

    pauseAudio() {
        console.log("Im running")
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
            </div>: 
            <div>loading</div>}
            </div>
            
        )
        }

}

export default EditSound