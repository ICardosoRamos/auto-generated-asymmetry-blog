import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Stack, Skeleton, Snackbar, Alert } from '@mui/material';
import { fetchArticleById } from '../api/articlesApi.js';
import ArticleDetail from '../components/Article/ArticleDetail.jsx';
import ErrorState from '../components/Feedback/ErrorState.jsx';

const ArticleSkeleton = () => (
  <Box
    sx={{
      p: { xs: 3, md: 4 },
      background: 'linear-gradient(140deg, #151B3D 0%, #0F122B 100%)',
      borderRadius: 3,
      border: '1px solid rgba(255, 255, 255, 0.08)',
    }}
  >
    <Stack spacing={2}>
      <Skeleton variant="rectangular" height={220} sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
      <Skeleton variant="text" width="60%" height={48} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
      <Skeleton variant="text" width="30%" sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
      <Skeleton variant="rectangular" height={140} sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
      <Skeleton variant="rectangular" height={120} sx={{ bgcolor: 'rgba(255,255,255,0.06)' }} />
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
