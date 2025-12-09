import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Stack, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const formatDate = (value) =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));

const buildPreview = (text, words = 30) => {
  if (!text) return '';
  const parts = text.split(/\s+/).slice(0, words).join(' ');
  return `${parts}${text.split(/\s+/).length > words ? '...' : ''}`;
};

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/articles/${article.id}`);

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea sx={{ height: '100%' }} onClick={handleClick}>
        <CardContent>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption" color="primary.main" fontWeight={600}>
                {formatDate(article.created_at)}
              </Typography>
              {article.topic && <Chip size="small" label={article.topic} color="primary" variant="outlined" />}
            </Stack>
            <Typography variant="h6" component="div">
              {article.title}
            </Typography>
            <Typography color="text.secondary">{buildPreview(article.content)}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;
