import "./App.css";
import { ConnectButton } from "./components";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThemeProvider from './theme/ThemeProvider';

const App = () => {

  return (
    <ThemeProvider>
      <div>
        <Typography variant="h1">Timestone</Typography>
        <ConnectButton />
        <Button variant="contained">Hello World</Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
