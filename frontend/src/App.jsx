import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import ArticlesPage from './pages/ArticlesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
