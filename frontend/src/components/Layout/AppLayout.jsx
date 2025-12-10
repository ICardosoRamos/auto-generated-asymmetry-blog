import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography, Stack } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const AppLayout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navButtonSx = (path) => ({
    color: isActive(path) ? '#E8EAF6' : '#9FA8DA',
    fontSize: '0.95rem',
    fontWeight: 500,
    textTransform: 'none',
    bgcolor: isActive(path) ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.06)',
      color: '#E8EAF6',
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '8px',
                  bgcolor: '#5C6BC0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AutoAwesomeIcon sx={{ color: '#fff', fontSize: '1.25rem' }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: '#E8EAF6',
                  letterSpacing: '-0.01em',
                }}
              >
                AutoBlog
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                component={RouterLink}
                to="/"
                sx={navButtonSx('/')}
              >
                Home
              </Button>
              <Button
                component={RouterLink}
                to="/articles"
                sx={navButtonSx('/articles')}
              >
                Articles
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                sx={navButtonSx('/about')}
              >
                About
              </Button>
              <Button
                component={RouterLink}
                to="/admin"
                sx={navButtonSx('/admin')}
              >
                Admin
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;
