import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUpdateArticle from '../Frontend/CreateUpdateArticle';
import FetchDisplayArticle from '../Frontend/FetchDisplayArticle';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateUpdateArticle/>}/> 
        <Route path="/Frontend/CreateUpdateArticle" element={<CreateUpdateArticle/>} />
        <Route path="/Frontend/FetchDisplayArticle" element ={<FetchDisplayArticle/>} />
        {/* Add a new route for FetchDisplayArticles */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
