import "./App.css";
import { ConnectButton } from "./components";
import Button from '@mui/material/Button';

function App() {
  return (
    <div>
      <h1>Timestone</h1>
      <ConnectButton />
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default App;
