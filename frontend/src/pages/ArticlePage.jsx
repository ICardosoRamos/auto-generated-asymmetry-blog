import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack, Skeleton, Snackbar, Alert } from '@mui/material';
import { fetchArticleById } from '../api/articlesApi.js';
import ArticleDetail from '../components/Article/ArticleDetail.jsx';
import ErrorState from '../components/Feedback/ErrorState.jsx';

const ArticleSkeleton = () => (
  <Box sx={{ p: { xs: 3, md: 4 }, backgroundColor: 'background.paper', borderRadius: 2 }}>
    <Stack spacing={2}>
      <Skeleton variant="text" width="60%" height={48} />
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="rectangular" height={180} />
      <Skeleton variant="rectangular" height={180} />
    </Stack>
  </Box>
);

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const loadArticle = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchArticleById(id);
      setArticle(data);
    } catch (err) {
      setError(err.message);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadArticle();
  }, [loadArticle]);

  if (loading) {
    return <ArticleSkeleton />;
  }

  if (error) {
    return (
      <>
        <ErrorState message={error} onRetry={loadArticle} />
        <Snackbar open={showToast} autoHideDuration={4000} onClose={() => setShowToast(false)}>
          <Alert severity="error" onClose={() => setShowToast(false)}>
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <>
      <ArticleDetail article={article} />
      <Snackbar open={showToast} autoHideDuration={4000} onClose={() => setShowToast(false)}>
        <Alert severity="error" onClose={() => setShowToast(false)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ArticlePage;
