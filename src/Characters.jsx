import React from 'react';
import { Typography, Box, Link, Button, CircularProgress, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import fetch from './fetch';

export default function Characters(props) {
  const { error, data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(
    ['characters'],
    ({ pageParam = 1 }) => fetch('https://swapi.dev/api/people/?page=' + pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.next?.split('=')?.pop();
      },
    },
  );

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error) return <p>Error :(</p>;

  return (
    <Box
      sx={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItemns: 'center',
        justifyContent: 'center',
        gap: '24px',
      }}
    >
      <Typography variant="h2">Star-Wars Characters</Typography>
      <Grid container spacing={3}>
        {data.pages.map((pages) => {
          return pages.results.map((person) => {
            const personUrlParts = person.url.split('/').filter(Boolean);
            const personId = personUrlParts[personUrlParts.length - 1];
            return (
              <Grid item xs={12} md={4} key={personId}>
                <Paper
                  sx={{
                    borderRadius: '8px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <Link component={RouterLink} to={`/characters/${personId}`}>
                    <Typography variant="h6">{person.name}</Typography>
                  </Link>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body1">{`${person.films.length}: films`}</Typography>
                    <Typography variant="body1">{`birth year: ${person.birth_year}`}</Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          });
        })}
      </Grid>
      <Button variant="outlined" onClick={handleLoadMore}>
        Load More
      </Button>
    </Box>
  );
}
