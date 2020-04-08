import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ReactAudioPlayer from 'react-audio-player';
import Recordings from './Recordings'


const UPLOAD_AUDIO = gql`
mutation($name: String!, $title: String!, $file: Upload!) {
  uploadAudio(name: $name, title: $title, file: $file)
}
`


class AudioUpload extends Component {

    state = {
        currentTitle: "",
        currentFile: ""
    }

    getFile() {
        let audioInput = document.getElementById("audio_file")
        if (audioInput) {
            let file = audioInput.files[0];
            return file;
        }
    }

    playAudio() {
        const myAudio = new Audio("./water.mp3");
        myAudio.play();
    }


    render() {
        const { currentFile } = this.state
        const state = this.props.location.state
        let user = ''
        if (state !== undefined) {
            user = state.user
        }

        return (
        <div id="audio_container">
            <div id="audio_title">Create a new recording</div>

            <div id="audio_content">
                <div id="upload_area">Upload audio here:
                    <input type="text" name ="title" className="field" placeholder="Name this file" id="file_name"
                    onChange={e => this.setState({ currentTitle: e.target.value })} required/>
                    <input type="file" name="audio" className="field" id="audio_file" accept="audio/*" 
                    onChange={e => this.setState({ currentFile: e.target.files[0] })} required/>
                    <div>
                    <Mutation
                        mutation={UPLOAD_AUDIO}
                        variables={{name: localStorage.getItem("currentUser"), title: this.state.currentTitle, file: this.getFile()}}
                        onCompleted={data => this.props.history.push(`/upload`)}
                        onError={err => console.log(err)}
                    >
                        {mutation => (
                            <div className="pointer mr2 button" onClick={mutation}>{"Add"}</div>)}
                    </Mutation>
                        
                    </div>
                </div>
                <div id="recordings">My Recordings:
                <Recordings user={user}></Recordings>
                </div>
                
            </div>
        </div>
        )
    }

}

export default AudioUpload