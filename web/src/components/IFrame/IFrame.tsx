import "./Iframe.css";
import html from "../../assets/example.txt";

interface IFrameProps {
  src: string;
}

export function IFrame({ src }: IFrameProps) {
  console.log(html);
  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(html, "text/html");
  console.log(`${htmlDoc}`);
  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div
        className="embed-wrapper"
        style={{
          position: "relative",
          width: "100%",
          height: "60%",
          paddingBottom: "100%",
        }}
      >
        <iframe
          srcDoc={`${htmlDoc}`}
          width="80%"
          height="100%"
          scrolling="no"
          sandbox="allow-scripts allow-top-navigation allow-forms allow-same-origin"
          // allowTransparency={true}
          allowFullScreen={true}
          // referrerPolicy="origin-when-cross-origin"
          // sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups"
        ></iframe>
      </div>
    </div>
  );
}
