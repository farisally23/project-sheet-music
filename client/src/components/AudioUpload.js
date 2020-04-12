import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ReactAudioPlayer from 'react-audio-player';
import Recordings from './Recordings';
import RecordSound from './RecordSound';


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


    render() {

        const { currentFile } = this.state
        const state = this.props.location.state
        let user = ''
        if (state !== undefined) {
            user = state.user
        }

        return (
        <div id="audio_container">

            <h3 id="audio_title">Upload and listen to your audio!</h3>

            <div id="audio_content">
                <div id="upload_area">
                You can upload an audio file here:
                    <div id="file_uploads">
                        <input type="text" name ="title" className="field" placeholder="Name this file" id="file_name"
                        onChange={e => this.setState({ currentTitle: e.target.value })} required/>
                        <input type="file" name="audio" className="field" id="audio_file" accept="audio/*" 
                        onChange={e => this.setState({ currentFile: e.target.files[0] })} required/>
                    
                        <div>
                        <Mutation
                            mutation={UPLOAD_AUDIO}
                            variables={{name: localStorage.getItem("currentUser"), title: this.state.currentTitle, file: this.getFile()}}
                            onError={err => console.log(err)}>
                            {mutation => (<div className="upload_button" onClick={mutation}>{"Upload!"}</div>)}
                        </Mutation>    
                        </div>
                    </div>

                
                <RecordSound></RecordSound>

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