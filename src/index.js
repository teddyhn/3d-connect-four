import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/index.scss'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/">
        <App />
      </Route>
      <Route path='/:id' render={props => {
        return ( <App {...props} /> )
      }} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
