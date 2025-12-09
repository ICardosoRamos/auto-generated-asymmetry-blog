import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Snackbar, Alert, Stack } from '@mui/material';
import { fetchArticles } from '../api/articlesApi.js';
import ArticleList from '../components/Article/ArticleList.jsx';
import LoadingState from '../components/Feedback/LoadingState.jsx';
import ErrorState from '../components/Feedback/ErrorState.jsx';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const loadArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchArticles();
      setArticles(data);
    } catch (err) {
      setError(err.message);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  if (loading) {
    return <LoadingState items={6} />;
  }

  if (error) {
    return (
      <>
        <ErrorState message={error} onRetry={loadArticles} />
        <Snackbar open={showToast} autoHideDuration={4000} onClose={() => setShowToast(false)}>
          <Alert severity="error" onClose={() => setShowToast(false)}>
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <Box>
      <Stack spacing={1.5} sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Artigos Recentes
        </Typography>
        <Typography color="text.secondary">
          Explorações geradas automaticamente sobre tecnologia, estratégia e inovação.
        </Typography>
      </Stack>
      <ArticleList articles={articles} />
      <Snackbar open={showToast} autoHideDuration={4000} onClose={() => setShowToast(false)}>
        <Alert severity="error" onClose={() => setShowToast(false)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
