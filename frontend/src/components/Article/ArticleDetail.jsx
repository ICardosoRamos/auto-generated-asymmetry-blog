import React from 'react';
import { Box, Typography, Stack, Chip, Divider } from '@mui/material';
import { estimateReadTime, formatDate, placeholderForTitle } from '../../utils/articleUtils.js';

const ArticleDetail = ({ article }) => {
  const paragraphs = article.content?.split(/\n{2,}|\r?\n/).filter(Boolean) || [];
  const readTime = estimateReadTime(article.content);
  const coverUrl = placeholderForTitle(article.title, 1200, 720);

  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
        background: 'linear-gradient(140deg, #151B3D 0%, #0F122B 100%)',
        borderRadius: 3,
        boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Stack spacing={3}>
        <Box
          sx={{
            height: { xs: 220, md: 320 },
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        />

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            label={article.topic || 'AI Insights'}
            size="small"
            sx={{
              bgcolor: 'rgba(92, 107, 192, 0.18)',
              color: '#E8EAF6',
              fontWeight: 600,
            }}
          />
          <Chip
            label={formatDate(article.created_at)}
            size="small"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.06)',
              color: '#B8C1EC',
              fontWeight: 600,
            }}
          />
          <Chip
            label={readTime}
            size="small"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.06)',
              color: '#B8C1EC',
              fontWeight: 600,
            }}
          />
        </Stack>

        <Typography variant="h3" component="h1" sx={{ color: '#E8EAF6', lineHeight: 1.25 }}>
          {article.title}
        </Typography>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
        <Stack spacing={2.5}>
          {paragraphs.length > 0 ? (
            paragraphs.map((para, idx) => (
              <Typography key={idx} variant="body1" sx={{ lineHeight: 1.8, color: '#C7D2FF' }}>
                {para}
              </Typography>
            ))
          ) : (
            <Typography variant="body1">Content unavailable.</Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ArticleDetail;
