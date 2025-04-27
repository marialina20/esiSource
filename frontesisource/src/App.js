import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SuiviArticle from './pages/SuiviArticle' ;
import LoginP from './pages/LoginP';
import NavbarUser from './pages/NavbarUser';
import UserHomeP from './pages/UserHomeP';
import ArticleDetail from './pages/ArticleDetail';
import HomePage from './pages/HomaPage';
import AjoutArticle from './pages/AjoutArticle';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard'; 


function App() {
  return (
    <div className="App">
      <BrowserRouter>
<Routes>
  <Route path="/SuiviArticle" element={<SuiviArticle />} />
  <Route path="/login" element={<LoginP />} />
  <Route path="/home" element={<UserHomeP />} />
  <Route path="/article/:id" element={<ArticleDetail />} />
  <Route path="/HomePage" element={<HomePage />} />
  <Route path="/AjoutArticle" element={<AjoutArticle />} />
  <Route path="/Upload" element={<Upload />} />
</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;