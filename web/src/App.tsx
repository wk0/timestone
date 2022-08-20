import "./App.css";
import { ConnectButton } from "./components";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createCustomTheme } from './theme';
import { ThemeProvider } from '@mui/material/styles';

const App = () => {

  const theme = createCustomTheme({
    direction: 'ltr',
    compact: true,
    roundedCorners: true,
    theme: 'DARK'
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="h1">Timestone</Typography>
        <ConnectButton />
        <Button variant="contained">Hello World</Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
