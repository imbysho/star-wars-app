import React from 'react';
import { Box } from '@mui/material';
import Characters from './Characters';
import Character from './Character';
import { Switch, Route, Redirect } from 'react-router-dom';

export default function Layout() {
  return (
    <Box className="App" sx={{ minHeight: '100vh' }}>
      <Box sx={{ minHeight: '100vh' }} as="main">
        <Switch>
          <Route exact path="/characters">
            <Characters />
          </Route>
          <Route exact path="/characters/:characterId">
            <Character />
          </Route>
          <Route path="/" render={() => <Redirect to="/characters" />} />
        </Switch>
      </Box>
    </Box>
  );
}
