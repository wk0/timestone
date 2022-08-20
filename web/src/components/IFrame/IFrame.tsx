import "./Iframe.css";

interface IFrameProps {
  src: string;
}

export function IFrame({ src }: IFrameProps) {
  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div
        className="nft-embed-wrapper"
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingBottom: "100%",
        }}
      >
        <iframe
          src={src}
          width="80%"
          height="100%"
          scrolling="no"
          // allowTransparency={true}
          allowFullScreen={true}
          sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups"
        ></iframe>
      </div>
    </div>
  );
}
