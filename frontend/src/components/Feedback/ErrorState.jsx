import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const ErrorState = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
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
