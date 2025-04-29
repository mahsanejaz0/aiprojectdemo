import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import WordFrequency from './components/WordFrequency';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
