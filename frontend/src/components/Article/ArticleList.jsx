import React from 'react';
import { Grid } from '@mui/material';
import ArticleCard from './ArticleCard.jsx';

const ArticleList = ({ articles }) => {
  return (
    <Grid container spacing={3}>
      {articles.map((article) => (
        <Grid item xs={12} sm={6} md={4} key={article.id}>
          <ArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleList;
