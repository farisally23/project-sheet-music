import React, { Component } from 'react'
import Header from './Header'
import { Switch, Route } from 'react-router-dom'
import "../styles/App.css"

//Components
import Login from './Login'
import AudioUpload from './AudioUpload'
import Homepage from './Homepage'
import AudioFeed from './AudioFeed'
import Friends from './Friends'
import Profile from './Profile'
import AddFriend from './AddFriend'
import EditSound from './EditSound'

class App extends Component {
  render() {
    return (
      <div id="main">
        <Header />
        <div >
          <Switch>
          <Route exact path="/" component={Homepage} />
            <Route exact path="/upload" component={AudioUpload} />
            <Route exact path="/explore" component={AudioFeed}/>
            <Route exact path="/friends" component={Friends}/>
            <Route exact path="/addfriend" component={AddFriend}/>
            <Route exact path="/edit" component={EditSound}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App