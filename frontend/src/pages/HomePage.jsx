import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Snackbar, Alert, Stack, Grid, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchArticles } from '../api/articlesApi.js';
import ArticleList from '../components/Article/ArticleList.jsx';
import LoadingState from '../components/Feedback/LoadingState.jsx';
import ErrorState from '../components/Feedback/ErrorState.jsx';
import { buildExcerpt, estimateReadTime, formatDate, placeholderForTitle } from '../utils/articleUtils.js';

const HomePage = () => {
  const navigate = useNavigate();
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

  if (!articles.length) {
    return (
      <>
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            background: 'linear-gradient(150deg, rgba(92,107,192,0.12), rgba(10,14,39,0.9))',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4" sx={{ color: '#E8EAF6' }}>
              Ainda não há artigos publicados
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
              Assim que novos conteúdos forem gerados pela IA eles aparecerão aqui automaticamente.
            </Typography>
            <Button variant="outlined" onClick={loadArticles}>
              Recarregar
            </Button>
          </Stack>
        </Box>
        <Snackbar open={showToast} autoHideDuration={4000} onClose={() => setShowToast(false)}>
          <Alert severity="error" onClose={() => setShowToast(false)}>
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);
  const featuredImage = placeholderForTitle(featuredArticle?.title, 800, 620);
  const featuredReadTime = estimateReadTime(featuredArticle?.content);
  const featuredExcerpt = buildExcerpt(featuredArticle?.content, 55);

  const handleFeaturedClick = () => navigate(`/articles/${featuredArticle.id}`);

  return (
    <Box>
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.4rem', md: '3.6rem' },
            fontWeight: 700,
            color: '#E8EAF6',
            mb: 1.5,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          AI-Generated Insights
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#9FA8DA',
            maxWidth: 820,
            lineHeight: 1.6,
          }}
        >
          Explorações criadas automaticamente sobre inteligência artificial, tecnologia e inovação em tempo real.
        </Typography>
      </Box>

      {featuredArticle && (
        <Box
          sx={{
            bgcolor: '#151B3D',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            mb: 8,
            transition: 'all 0.3s ease',
            '&:hover': {
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: 'translateY(-4px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: { xs: 260, md: '100%' },
                  minHeight: { md: 420 },
                  bgcolor: '#1E2749',
                  backgroundImage: `url(${featuredImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 4, md: 5 } }}>
                <Stack direction="row" spacing={1} sx={{ mb: 3 }} alignItems="center">
                  <Chip
                    label="Em destaque"
                    size="small"
                    sx={{
                      bgcolor: '#5C6BC0',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: '24px',
                    }}
                  />
                  <Chip
                    label={featuredArticle.topic || 'AI Insights'}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#9FA8DA',
                      fontSize: '0.75rem',
                      height: '24px',
                    }}
                  />
                  <Chip
                    label={formatDate(featuredArticle.created_at)}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      color: '#B8C1EC',
                      fontSize: '0.75rem',
                      height: '24px',
                    }}
                  />
                </Stack>

                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.8rem', md: '2.25rem' },
                    fontWeight: 700,
                    color: '#E8EAF6',
                    mb: 2,
                    lineHeight: 1.3,
                  }}
                >
                  {featuredArticle.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '1.05rem',
                    color: '#B8C1EC',
                    mb: 3,
                    lineHeight: 1.7,
                  }}
                >
                  {featuredExcerpt}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: '#5C6BC0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                    }}
                  >
                    AI
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#E8EAF6', fontWeight: 600, fontSize: '0.95rem' }}>
                      Autor IA
                    </Typography>
                    <Typography sx={{ color: '#7986CB', fontSize: '0.9rem' }}>
                      {formatDate(featuredArticle.created_at)} • {featuredReadTime}
                    </Typography>
                  </Box>
                </Stack>

                <Button variant="contained" color="primary" size="large" onClick={handleFeaturedClick}>
                  Ler artigo completo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#E8EAF6',
            }}
          >
            Últimos artigos
          </Typography>
          <Typography sx={{ color: '#9FA8DA' }}>{articles.length} publicações</Typography>
        </Stack>
        {otherArticles.length ? (
          <ArticleList articles={otherArticles} />
        ) : (
          <Typography sx={{ color: '#9FA8DA' }}>Mais artigos chegam em breve.</Typography>
        )}
      </Box>

      <Snackbar open={showToast} autoHideDuration={4000} onClose={() => setShowToast(false)}>
        <Alert severity="error" onClose={() => setShowToast(false)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
