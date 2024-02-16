import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Inspo from './pages/Inspo';

function App(){ 
   return ( 
      <div className="App"> 
      <Router> 
          <Routes>
          <Route element={<Homepage />} path="/"/>
          <Route element={<Inspo />} path="/inspiration"/>
          </Routes>
      </Router> 
      
    </div> 
)} 
export default App;
