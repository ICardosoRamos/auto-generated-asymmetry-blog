import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { generateArticleAdmin, fetchArticles } from '../api/articlesApi.js';
import ArticleList from '../components/Article/ArticleList.jsx';
import LoadingState from '../components/Feedback/LoadingState.jsx';

const AdminPage = () => {
  const [topic, setTopic] = useState('');
  const [secret, setSecret] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);

  const loadRecent = useCallback(async () => {
    try {
      setListLoading(true);
      const response = await fetchArticles({ page: 1, limit: 5, sort: 'recent' });
      setArticles(response.data || []);
    } catch (err) {
      setStatus(err.message);
      setStatusType('error');
      setToastOpen(true);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecent();
  }, [loadRecent]);

  const handleGenerate = async () => {
    setLoading(true);
    setStatus('');
    setStatusType('info');
    try {
      const created = await generateArticleAdmin({ topic, secret });
      setStatus(`Article created: ${created.title}`);
      setStatusType('success');
      setToastOpen(true);
      setTopic('');
      await loadRecent();
    } catch (err) {
      setStatus(err.message);
      setStatusType('error');
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          background: 'linear-gradient(150deg, rgba(92,107,192,0.16), rgba(10,14,39,0.9))',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.4rem' }, fontWeight: 700 }}>
            Admin • Generate article
          </Typography>
          <Typography sx={{ color: '#B8C1EC' }}>
            Provide the admin secret and optional topic to trigger a new AI-generated article immediately.
          </Typography>
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} useFlexGap>
            <TextField
              size="small"
              label="Admin secret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              sx={{ minWidth: 240 }}
            />
            <TextField
              size="small"
              label="Topic (optional)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              helperText="3 to 80 characters if provided"
              sx={{ minWidth: 240 }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleGenerate}
              disabled={loading || !secret.trim()}
              sx={{ minWidth: 140, height: 40 }}
            >
              {loading ? 'Generating...' : 'Generate now'}
            </Button>
          </Stack>
          {status && (
            <Alert severity={statusType} variant="filled">
              {status}
            </Alert>
          )}
        </Stack>
      </Box>

      <Card
        sx={{
          background: 'linear-gradient(145deg, rgba(21,27,61,0.9), rgba(10,14,39,0.95))',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Recent articles
            </Typography>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
          </Stack>
          {listLoading ? <LoadingState items={5} /> : <ArticleList articles={articles} />}
        </CardContent>
      </Card>

      <Snackbar open={toastOpen} autoHideDuration={4000} onClose={() => setToastOpen(false)}>
        <Alert severity={statusType} onClose={() => setToastOpen(false)}>
          {status}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
