import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'
import Signup from './src/components/Signup'
// ! Some starter code for your frontends, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  </BrowserRouter>
)

const Home = () => <Link to={'/hello/world'}>
  Go to /hello/world page.
</Link>


export default App