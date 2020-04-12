import React, { Component } from 'react'
import "../styles/AudioFeed.css"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AudioElement from './AudioElement'

const GET_FILES = gql`
query($username: String!) {
  getFriendsFiles(username: $username) {
      _id
      title
      owner
      filename
  }
}
`

class AudioFeed extends Component {
    
    state = {}

    render() {
        return (
          <div>
          <h1>Explore</h1>
          <h3>Your friends audio will show up here:</h3>
          <Query query={GET_FILES}
        variables={{username: localStorage.getItem('currentUser')}}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
        
              const allAudio = data.getFriendsFiles
        
              return (
                <div>
                  {allAudio.map(file => 
                  <div id="poster" key={file._id}>
                    <AudioElement file={file}/>
                    Posted by: {file.owner}
                  </div>)}
                </div>
              )
            }}
          </Query>
          </div>
        )
      }
  }

  export default AudioFeed