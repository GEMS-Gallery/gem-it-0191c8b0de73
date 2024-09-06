import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DiamondIcon from '@mui/icons-material/Diamond';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <DiamondIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gem it!
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/add">
          Add Gem
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
