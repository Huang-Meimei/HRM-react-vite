import './App.scss';

import React, { Component } from 'react'
import {Routes, Route, BrowserRouter,HashRouter} from "react-router-dom"
import Home from './routes/home/Home';
import About from './routes/about/About';
import {Button} from 'antd'
import Login from './views/login/index'
import Layout from './components/Layout'

class App extends Component {
  constructor(props){
    super(props)
    this.state={}
  }
  render() {
    return (
      <>
        <Layout>
        <Login></Login>
        <HashRouter>
          <Routes>
            <Route element={<Home/>} path="/"/>
            <Route element={<About/>} path="/about"/>

          </Routes>

        </HashRouter>
        </Layout>
      
      </>

    )
  }
}

export default App;
