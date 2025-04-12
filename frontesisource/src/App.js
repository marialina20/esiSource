import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginP from './pages/LoginP';
import Navvbar from './pages/Navvbar';
import { Link } from 'react-router-dom';
function App() {
  return (
   <div>  
   <BrowserRouter >
        <Routes >
          {<Route index element ={<Navvbar/>}/> } 
        </Routes>
    </BrowserRouter>

   </div>
   

  );
}

export default App;