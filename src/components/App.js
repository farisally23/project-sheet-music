import React, { Component } from 'react'
import Header from './Header'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import AudioUpload from './AudioUpload'
import Homepage from './Homepage'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
          <Route exact path="/" component={Homepage} />
            <Route exact path="/upload" component={AudioUpload} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App