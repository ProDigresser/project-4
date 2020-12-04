import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import Home from './src/components/Home'
import Navbar from './src/components/Navbar'
import './styles/style.scss'
import Signup from './src/components/Signup'
import Login from './src/components/Login'
import EditVideo from './src/components/EditVideo'
// ! Some starter code for your frontends, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path ="/edit-video/:videoId" component={EditVideo} />
    </Switch>
  </BrowserRouter>
)


export default App