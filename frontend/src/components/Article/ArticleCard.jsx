import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Stack, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { buildExcerpt, estimateReadTime, formatDate, placeholderForTitle } from '../../utils/articleUtils.js';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/articles/${article.id}`);

  const topic = article.topic || 'AI Insights';
  const date = formatDate(article.created_at);
  const preview = buildExcerpt(article.content, 34);
  const readTime = estimateReadTime(article.content);
  const placeholderUrl = placeholderForTitle(article.title || 'AutoBlog', 600, 420);

  return (
    <Card
      sx={{
        bgcolor: '#151B3D',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
          '& .article-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          '&:hover .article-image': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <Box
          className="article-image"
          sx={{
            height: 200,
            bgcolor: '#1E2749',
            backgroundImage: `url(${placeholderUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.3s ease',
            width: '100%',
          }}
        />

        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <Chip
              label={topic}
              size="small"
              sx={{
                bgcolor: 'rgba(92, 107, 192, 0.15)',
                color: '#9FA8DA',
                fontSize: '0.75rem',
                fontWeight: 600,
                height: '22px',
                border: '1px solid rgba(92, 107, 192, 0.3)',
              }}
            />
            <Chip
              label={date}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                color: '#B8C1EC',
                fontSize: '0.72rem',
                height: '22px',
              }}
            />
          </Stack>

          <Typography
            variant="h6"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#E8EAF6',
              mb: 1.5,
              lineHeight: 1.35,
              flexGrow: 0,
            }}
          >
            {article.title}
          </Typography>

          <Typography
            sx={{
              fontSize: '0.95rem',
              color: '#B8C1EC',
              mb: 2,
              lineHeight: 1.6,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {preview}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 'auto' }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#5C6BC0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            >
              AI
            </Box>
            <Box>
              <Typography sx={{ color: '#7986CB', fontSize: '0.8rem' }}>
                {date} • {readTime}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;
