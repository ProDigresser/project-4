import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import Home from './src/components/Home'
import Navbar from './src/components/Navbar'
import Signup from './src/components/Signup'
import Video from './src/components/Video'
import Login from './src/components/Login'
<<<<<<< HEAD
import EditVideo from './src/components/EditVideo'
// ! Some starter code for your frontends, change this
// ! however you like.
=======

import './styles/style.scss'


>>>>>>> 2f3b4c878da1d533457c5cd514fe0cfc6857e3af
const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
<<<<<<< HEAD
      <Route exact path ="/edit-video/:videoId" component={EditVideo} />
=======
      <Route exact path="/videos/:videoId" component={Video} />
>>>>>>> 2f3b4c878da1d533457c5cd514fe0cfc6857e3af
    </Switch>
  </BrowserRouter>
)


export default App