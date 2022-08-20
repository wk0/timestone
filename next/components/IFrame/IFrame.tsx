import "./IFrame.module.css";
// import html from "../../assets/example.txt";

interface IFrameProps {
  src: string;
}

const HTMLSTRING = `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Regular reminder: all 5000+ of my instagram accounts are fake profiles and have nothing to do with me. Anything you see &quot;Vitalik Buterin&quot; (or &quot;Bütеirn&quot; or whatever) posting on instagram is a scam.</p>&mdash; vitalik.eth (@VitalikButerin) <a href="https://twitter.com/VitalikButerin/status/1558893139959709697?ref_src=twsrc%5Etfw">August 14, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>";`;

export function IFrame({ src }: IFrameProps) {
  // console.log(html);
  var parser = new DOMParser();
  //var htmlDoc = parser.parseFromString(html, "text/html");
  // console.log(`${htmlDoc}`);
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
          srcDoc={HTMLSTRING}
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
