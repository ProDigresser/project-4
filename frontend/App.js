import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import Home from './src/components/Home'
import Navbar from './src/components/Navbar'
import Signup from './src/components/Signup'
import Video from './src/components/Video'
import Login from './src/components/Login'

import './styles/style.scss'


const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/videos/:videoId" component={Video} />
    </Switch>
  </BrowserRouter>
)


export default App