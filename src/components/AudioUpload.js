import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const UPLOAD_AUDIO = gql`
mutation($file: Upload!) {
  uploadAudio(file: $file)
}
`


class AudioUpload extends Component {

    state = {
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


    render() {
        const { currentFile } = this.state
        return (
        <div id="audio_container">
            <div id="audio_title">Create a new recording</div>

            <div id="audio_content">
                <div id="upload_area">Upload audio here:
                    <input type="file" name="audio" class="field" id="audio_file" accept="audio/*" 
                    onChange={e => this.setState({ currentFile: e.target.files[0] })} required/>
                    <div>
                    <Mutation
                        mutation={UPLOAD_AUDIO}
                        variables={{file: this.getFile()}}
                        onCompleted={data => this.props.history.push(`/upload`)}
                    >
                        {mutation => (
                            <div className="pointer mr2 button" onClick={mutation}>{"Add"}</div>)}
                    </Mutation>
                        
                    </div>
                </div>
                <div id="recordings">My Recordings:
                    <div class="record">
                        <div class="filename">File1</div>
                        <div class="play_button">Click to Play!</div>
                    </div>
                </div>
            </div>

        </div>
        )
    }

}

export default AudioUpload