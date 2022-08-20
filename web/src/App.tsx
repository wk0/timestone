import "./App.css";
import { useState } from "react";
import { ConnectButton, IFrame } from "./components";
import { useIsValidURL } from "./hooks";
import Button from "@mui/material/Button";

function App() {
  const [url, setURL] = useState("https://example.com");
  const isValid = useIsValidURL(url);

  return (
    <div>
      <h1>Timestone</h1>
      <ConnectButton />
      <input value={url} onChange={(e) => setURL(e.target.value)} />
      {isValid ? <IFrame src={url} /> : <p>Not a valid url!</p>}
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default App;
