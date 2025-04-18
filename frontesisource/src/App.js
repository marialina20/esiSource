import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuiviArticle from './pages/SuiviArticle' ;
import LoginP from './pages/LoginP';
import Navvbar from './pages/Navvbar';
import UserHomeP from './pages/UserHomeP';
import ArticleDetail from './pages/ArticleDetail';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
<Routes>
  <Route path="/SuiviArticle" element={<SuiviArticle />} />
  <Route path="/login" element={<LoginP />} />
  <Route path="/home" element={<UserHomeP />} />
  <Route path="/article/:id" element={<ArticleDetail />} />
</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;