import React from 'react';
import { Box, Typography, Stack, Chip, Divider } from '@mui/material';

const formatDate = (value) =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));

const ArticleDetail = ({ article }) => {
  const paragraphs = article.content?.split(/\n{2,}|\r?\n/).filter(Boolean) || [];

  return (
    <Box sx={{ p: { xs: 3, md: 4 }, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: '0 14px 40px rgba(0,0,0,0.06)' }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Publicado em {formatDate(article.created_at)}
          </Typography>
          {article.topic && <Chip size="small" label={article.topic} color="primary" variant="outlined" />}
        </Stack>
        <Typography variant="h3" component="h1">
          {article.title}
        </Typography>
        <Divider />
        <Stack spacing={2}>
          {paragraphs.length > 0 ? (
            paragraphs.map((para, idx) => (
              <Typography key={idx} variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {para}
              </Typography>
            ))
          ) : (
            <Typography variant="body1">Conteúdo indisponível.</Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ArticleDetail;
