import React from 'react';
import { Box, Typography, Grid, Stack, Chip, Card, CardContent, Divider } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const AboutPage = () => {
  return (
    <Box>
      <Box
        sx={{
          mb: 6,
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          background: 'linear-gradient(140deg, rgba(92,107,192,0.2), rgba(10,14,39,0.9))',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Stack spacing={2.5} sx={{ maxWidth: 880 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                bgcolor: '#5C6BC0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AutoAwesomeIcon sx={{ color: '#fff' }} />
            </Box>
            <Chip
              label="About AutoBlog"
              size="small"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', color: '#E8EAF6', fontWeight: 600 }}
            />
          </Stack>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.8rem' },
              fontWeight: 700,
              color: '#E8EAF6',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            AI-crafted content, human curation, and an experience built for you.
          </Typography>
          <Typography sx={{ color: '#B8C1EC', fontSize: '1rem', lineHeight: 1.7 }}>
            This project automatically generates articles about artificial intelligence, technology, and innovation. We
            combine a generation pipeline with a clean interface so you can keep up with new ideas effortlessly.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Chip label="AI + Automation" sx={{ bgcolor: 'rgba(92,107,192,0.18)', color: '#E8EAF6' }} />
            <Chip label="Frequent updates" sx={{ bgcolor: 'rgba(92,107,192,0.12)', color: '#B8C1EC' }} />
            <Chip label="Reading-first design" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#E8EAF6' }} />
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(145deg, rgba(21,27,61,0.9), rgba(10,14,39,0.95))',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" sx={{ color: '#E8EAF6', fontWeight: 700, mb: 2 }}>
                How it works
              </Typography>
              <Typography sx={{ color: '#B8C1EC', lineHeight: 1.7, mb: 2 }}>
                We connect content generation services, store articles in our API, and deliver everything in a modern
                interface built with React and Material UI. Every post gets a cover, reading time estimate, and a layout
                optimized for focus.
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 2 }} />
              <Stack spacing={1.5}>
                <Typography sx={{ color: '#E8EAF6', fontWeight: 600 }}>Core stack</Typography>
                <Typography sx={{ color: '#B8C1EC' }}>React + Vite • Material UI • Integrations with our API</Typography>
                <Typography sx={{ color: '#B8C1EC' }}>Automated AI article generation pipeline</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(145deg, rgba(18,23,53,0.95), rgba(10,14,39,0.98))',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" sx={{ color: '#E8EAF6', fontWeight: 700, mb: 2 }}>
                Our goal
              </Typography>
              <Typography sx={{ color: '#B8C1EC', lineHeight: 1.7, mb: 2 }}>
                Deliver knowledge quickly with automated curation and a consistent visual language. This project is a
                playground: new articles go live as soon as they are generated, keeping the feed always fresh.
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 2 }} />
              <Stack spacing={1.5}>
                <Typography sx={{ color: '#E8EAF6', fontWeight: 600 }}>Guiding principles</Typography>
                <Typography sx={{ color: '#B8C1EC' }}>Transparency about AI usage and automated sources</Typography>
                <Typography sx={{ color: '#B8C1EC' }}>Responsive experience ready to read on any screen</Typography>
                <Typography sx={{ color: '#B8C1EC' }}>Solid base to evolve with new sections and filters</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutPage;
