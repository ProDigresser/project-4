import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import Home from './src/components/Home'
import './styles/style.scss'

// ! Some starter code for your frontends, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)




export default App