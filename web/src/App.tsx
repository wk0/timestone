import "./App.css";
import { ConnectButton } from "./components";
import HeroContent from "./components/HeroContent";
import InputBox from './components/InputBox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThemeProvider from './theme/ThemeProvider';

const App = () => {

  return (
    <ThemeProvider>
      <HeroContent />
      <InputBox />
    </ThemeProvider>
  );
};

export default App;
