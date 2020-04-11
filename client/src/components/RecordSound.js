import React, { Component } from 'react'
import "../styles/RecordSound.css"
import "../styles/AudioUpload.css"
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const UPLOAD_AUDIO = gql`
mutation($name: String!, $title: String!, $file: Upload!) {
  uploadAudio(name: $name, title: $title, file: $file)
}
`

class RecordSound extends Component {

    constructor(props) {
        super(props);
        this.recordAndSave = this.recordAndSave.bind(this);

        this.state = {
            recordingName: "",
            recorded: false,
            file: ""
        }

        this.recordingHeader = (
            <div>Current Recording:</div>
        );

    }


    

    // Followed this example in creating this function: https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
    recordAndSave() {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {

            const mediaRecorder = new MediaRecorder(stream);
            const audioPlayer = document.getElementById('recordedAudio');

            // Stop recording when user clicks the stop button
            let stopButton = document.getElementById('stopRecord');
            stopButton.addEventListener("click", () => {
                if (mediaRecorder.state == 'recording') {
                    mediaRecorder.stop();
                } 
            });

            // Start recording and save audio
            mediaRecorder.start();
            const audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            // Save recording when the user stops
            mediaRecorder.addEventListener("stop", () => {
                this.setState({recorded: true});
                const audioBlob = new Blob(audioChunks);
                let newFile = this.blobToFile(audioBlob, "new.mp3");
                this.setState({file: newFile});
                const audioUrl = URL.createObjectURL(audioBlob);
                audioPlayer.src = audioUrl;
                audioPlayer.controls = true;
            });

        
    });
    }

    // This function taken from https://stackoverflow.com/questions/27159179/how-to-convert-blob-to-file-in-javascript/29390393
    blobToFile(theBlob, fileName){
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    render() {
        const visible = this.state.recorded ? {visibility : "visible"} : {visibility : "hidden"};

        return (
        <div>
            <h2>Record</h2>

            <div>
                <button id='record' onClick={this.recordAndSave}></button>
                <button id='stopRecord'>Stop</button>
            </div>

            <div>
                <div id='recordingHeader' style={visible}>{this.recordingHeader}</div>
                <audio id='recordedAudio'></audio>
                <div id='recordingOptions' style={visible}>

                <div>
                    <form>
                        <input type="text" placeholder="Give this recording a name"
                        onChange={e => this.setState({ recordingName: e.target.value })} required/>
                    </form>

                    <Mutation
                        mutation={UPLOAD_AUDIO}
                        variables={{name: localStorage.getItem("currentUser"), title: this.state.recordingName, file: this.state.file}}
                        onError={err => console.log(err)}>
                        {mutation => (<div className="pointer mr2 button" onClick={mutation}>{"Click to Save!"}</div>)}
                    </Mutation>
                    
                    <div>Or press "Record" to record again</div>
                </div>
            </div>
        
            </div>
        </div>  
        )
    }
}

export default RecordSound