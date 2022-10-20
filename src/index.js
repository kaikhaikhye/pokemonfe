import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import 'react-toastify/dist/ReactToastify.css';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Profile from './containers/Profile';
import Layout from "./hoc/Layout";
import { Provider } from 'react-redux'
import configureStore from './configureStore'
const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  </React.StrictMode >
);

