import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import AudioElement from './AudioElement'

const GET_FILES = gql`
query($username: String!) {
  getAllFiles(username: $username) {
      _id
      title
      owner
      filename
  }
}
`

// THIS IS HOW TO PLAY AUDIO
/* <audio ref={(green) => { this.green = green; }}>
              <source src={`${require('../uploads/water.mp3')}`} type="audio/mpeg" >
              </source>
          </audio> */
class AudioFeed extends Component {
    
    state = {}

    render() {
        return (
          <Query query={GET_FILES}
        variables={{username: localStorage.getItem('currentUser')}}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
        
              const allAudio = data.getAllFiles
        
              return (
                <div>
                  {allAudio.map(file => 
                  <div key={file._id}>
                    <AudioElement file={file}/>
                    Posted by {file.owner}
                  </div>)}
                </div>
              )
            }}
          </Query>
        )
      }
  }

  export default AudioFeed