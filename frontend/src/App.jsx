import {React, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import InterestGroups from './components/InterestGroups';
import CreateGroup from './components/CreateGroup';
import InterestGroupDetail from './components/InterestGroupDetail';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';
import MyInterestGroups from './components/MyInterestGroups';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import * as util_request from './request/util.request'

import * as websocket_client from './request/client.websocket'


function App() {
  const [title, setTitle] = useState("");

  util_request.getTitle().then(result => {
    console.log(title)
    setTitle(result);
  })
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/groups" element={<InterestGroups />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/groups/:id" element={<InterestGroupDetail />} />
          <Route path="/groups/:id/create-post" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/my-groups" element={<MyInterestGroups />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
