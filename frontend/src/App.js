import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Homepage from "./pages/Homepage";

function App(){ 
   return ( 
      <div className="App"> 
      <BrowserRouter> 
          <Homepage /> 
      </BrowserRouter> 
      
    </div> 
)} 
export default App;
