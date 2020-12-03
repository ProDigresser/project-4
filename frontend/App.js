import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'

// ! Some starter code for your frontends, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/hello/world" component={MyPage} />
    </Switch>
  </BrowserRouter>
)

const Home = () => <Link to={'/hello/world'}>
  Go to /hello/world page.
</Link>

const MyPage = () => {
  return <p>
    Hello World
  </p>
}

export default App