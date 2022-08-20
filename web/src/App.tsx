import "./App.css";
import { useState } from "react";
import { ConnectButton, IFrame } from "./components";
import Button from "@mui/material/Button";

function App() {
  const [url, setURL] = useState("https://example.com");

  return (
    <div>
      <h1>Timestone</h1>
      <ConnectButton />
      <IFrame src={url} />
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default App;
