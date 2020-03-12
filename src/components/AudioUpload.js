import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ReactAudioPlayer from 'react-audio-player';


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
            console.log(file);
            return file;
        }
    }

    playAudio() {
        const myAudio = new Audio("./water.mp3");
        console.log(myAudio)
        myAudio.play();
    }


    render() {
        const { currentFile } = this.state
        return (
        <div id="audio_container">
            <div id="audio_title">Create a new recording</div>

            <div id="audio_content">
                <div id="upload_area">Upload audio here:
                    <input type="text" name ="title" class="field" placeholder="Name this file" id="file_name"
                    onChange={e => this.setState({ currentTitle: e.target.value })} required/>
                    <input type="file" name="audio" class="field" id="audio_file" accept="audio/*" 
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
                    <div class="record">
                        <div class="filename">File1</div>
                        <button onClick={this.playAudio} class="play_button">Play!</button>
                    </div>
                </div>
            </div>

        </div>
        )
    }

}

export default AudioUpload