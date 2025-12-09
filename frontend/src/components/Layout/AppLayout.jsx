import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography, Stack, Divider } from '@mui/material';

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at 20% 20%, #e8f1ff 0, transparent 30%), #f6f8fb' }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ py: 2 }}>
          <Stack spacing={0.5}>
            <Typography variant="h6" component="div" fontWeight={700}>
              AI Generated Blog
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Artigos criados automaticamente com suporte de IA, atualizados diariamente.
            </Typography>
          </Stack>
        </Toolbar>
        <Divider />
      </AppBar>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;
