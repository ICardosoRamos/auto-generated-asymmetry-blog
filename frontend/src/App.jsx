import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
