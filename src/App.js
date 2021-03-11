import  React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/jquery/dist/jquery.min.js';
import  Header  from './components/Header';
import  Report  from './components/Report';
import './App.css';

const App = () => (
    <div className="container bg-light min-vh-100">
      <div className="row py-4">

        <Header  />
        <Report />
        
    </div>
  </div>
)


export default App;