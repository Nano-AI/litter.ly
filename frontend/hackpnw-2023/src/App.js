import { ThemeProvider } from '@emotion/react';
import './App.css';
import EventGroup from './components/EventGroup/EventGroup';
import NavBar from './components/NavBar/Navbar';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#35a02a",
    },
    secondary: {
      main: "#f4d4d9"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <EventGroup /> 
      </div>
    </ThemeProvider>
  );
}

export default App;
