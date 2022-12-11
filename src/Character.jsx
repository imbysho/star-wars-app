import React from 'react';
import {
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Link,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import fetch from './fetch';

function Character(props) {
  const characterId = props.match.params.characterId;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { status, data, isLoading } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => fetch(`https://swapi.dev/api/people/${characterId}/`),
  });

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

  if (status === 'error') return <p>Error :(</p>;

  if (status !== 'success') {
    return null;
  }

  return (
    <Box
      sx={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Link component={RouterLink} to={`/characters`}>
        <Box display="flex" alignItems="center">
          <KeyboardBackspaceIcon />
          {matches && <Typography variant="h6">Back to main list</Typography>}
        </Box>
      </Link>
      <Typography variant="h2">{data.name}</Typography>
      <TableContainer component={Paper} style={{ maxWidth: '400px' }}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Feature</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{data.height}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{data.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mass</TableCell>
              <TableCell>{data.mass}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hair Color</TableCell>
              <TableCell>{data.hair_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Eye Color</TableCell>
              <TableCell>{data.eye_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Skin Color</TableCell>
              <TableCell>{data.skin_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Birth Year</TableCell>
              <TableCell>{data.birth_year}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Typography variant="h4">{`${data.films.length} Films`}</Typography>
      <Box>
        {data.films.map((film) => {
          const filmUrlParts = film.split('/').filter(Boolean);
          const filmId = filmUrlParts[filmUrlParts.length - 1];
          return <Film id={filmId} key={`Film-${filmId}`} />;
        })}
      </Box>
    </Box>
  );
}

function Film(props) {
  const { id } = props;
  const { data, isLoading } = useQuery({
    queryKey: ['film', id],
    queryFn: () => fetch(`https://swapi.dev/api/films/${id}/`),
  });

  return (
    <ul key={id}>
      <li>{!isLoading ? <Typography>{data.title}</Typography> : <CircularProgress />}</li>
    </ul>
  );
}

export default withRouter(Character);
