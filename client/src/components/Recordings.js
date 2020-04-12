import React, { Component } from 'react'
import "../styles/AudioUpload.css"
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AudioElement from './AudioElement'

const GET_FILES = gql`
query($username: String!) {
  getUserFiles(username: $username) {
      _id
      title
      owner
      filename
  }
}
`

class Recordings extends Component {
    
    state = {}

    render() {
        return (
          <Query query={GET_FILES}
        variables={{username: this.props.user}}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>
        
              const userSavedFiles = data.getUserFiles
        
              return (
                <div>
                  {userSavedFiles.map(file => <AudioElement key={file._id} file={file}/>)}
                </div>
              )
            }}
          </Query>
        )
      }
  }

  export default Recordings