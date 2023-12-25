import './App.scss';

import React, { Component } from 'react'
import {Routes, Route, BrowserRouter,HashRouter} from "react-router-dom"
import Home from './routes/home/Home';
import About from './routes/about/About';
import {Button} from 'antd'
import Login from './views/login/index'

class App extends Component {
  constructor(props){
    super(props)
    this.state={}
  }
  render() {
    return (
      <>
        <Login></Login>
        <div className='test'>
          <Button type='primary'>button</Button>
          <h1>aaaaa</h1></div>
        <HashRouter>
          <Routes>
            <Route element={<Home/>} path="/"/>
            <Route element={<About/>} path="/about"/>

          </Routes>

        </HashRouter>
      
      </>

    )
  }
}

export default App;
