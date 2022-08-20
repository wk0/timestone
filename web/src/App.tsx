import "./App.css";
import { ConnectButton } from "./components";
import ThemeProvider from './theme/ThemeProvider';
import routes from "./routes";
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';

const App = () => {

  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      {content}
    </ThemeProvider>
  );
};

export default App;
