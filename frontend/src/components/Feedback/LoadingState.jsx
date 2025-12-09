import React from 'react';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

const LoadingState = ({ items = 3 }) => {
  return (
    <Box>
      <Skeleton variant="text" width={260} height={44} sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.08)' }} />
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {Array.from({ length: items }).map((_, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              sx={{
                bgcolor: '#151B3D',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <Skeleton variant="rectangular" height={170} animation="wave" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
              <CardContent>
                <Skeleton variant="text" width="70%" height={32} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
                <Skeleton variant="text" width="50%" sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
                <Skeleton variant="rectangular" height={70} sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.06)' }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoadingState;
