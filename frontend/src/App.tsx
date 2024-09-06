import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AddGemPage from './pages/AddGemPage';
import GemDetailsPage from './pages/GemDetailsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2',
    },
    secondary: {
      main: '#50E3C2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddGemPage />} />
          <Route path="/gem/:id" element={<GemDetailsPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
