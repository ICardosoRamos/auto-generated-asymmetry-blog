import React from 'react';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

const LoadingState = ({ items = 3 }) => {
  return (
    <Box>
      <Skeleton variant="text" width={220} height={36} sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        {Array.from({ length: items }).map((_, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="80%" height={32} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="rectangular" height={80} sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoadingState;
