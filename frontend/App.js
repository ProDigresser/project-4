import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Users from './src/components/Users'
import EditVideo from './src/components/EditVideo'
import EditComment from './src/components/EditComment'
import EditUser from './src/components/EditUser'
import ReplyComment from './src/components/ReplyComment'
import Home from './src/components/Home'
import WebNavbar from './src/components/WebNavbar'
import MobileNavbar from './src/components/MobileNavbar'
import Signup from './src/components/Signup'
import Video from './src/components/Video'
import Login from './src/components/Login'
import AddVideo from './src/components/AddVideo'
import Footer from './src/components/Footer'
import './src/styles/styles.scss'
import UserProfile from './src/components/UserProfile'


const App = () => (
  <BrowserRouter>
    <WebNavbar className="webNavbar" />
    <MobileNavbar className="mobileNavbar" pageWrapId={'page-wrap'} outerContainerId={'App'} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/add-video" component={AddVideo} />
      <Route exact path ="/edit-video/:videoId" component={EditVideo} />
      <Route exact path ="/edit-user/:userId" component={EditUser} />
      <Route exact path ="/edit-comment/:videoId/:commentId" component={EditComment} />
      <Route exact path ="/reply-comment/:commentId" component={ReplyComment} />
      <Route exact path="/videos/:videoId" component={Video} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/users/:userId" component={UserProfile} />
    </Switch>
    <Footer />
  </BrowserRouter>


)


export default App