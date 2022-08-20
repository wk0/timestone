import "./App.css";
import { useState } from "React";
import { ConnectButton, IFrame } from "./components";

function App() {
  const [url, setURL] = useState("https://example.com");

  return (
    <div>
      <h1>Timestone</h1>
      <ConnectButton />
      <IFrame src={url} />
    </div>
  );
}

export default App;
