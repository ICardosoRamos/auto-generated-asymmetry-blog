import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const ErrorState = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        p: 4,
        background: 'linear-gradient(150deg, rgba(255,79,112,0.08), rgba(92,107,192,0.08))',
        borderRadius: 3,
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#E8EAF6',
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6">Algo deu errado</Typography>
        <Typography color="text.secondary">{message}</Typography>
        {onRetry && (
          <Button variant="contained" startIcon={<RefreshIcon />} onClick={onRetry}>
            Tentar novamente
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default ErrorState;
