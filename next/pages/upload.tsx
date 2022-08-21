import type { NextPage } from "next";
import React, { useState } from "react";

const Upload: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState("");

  const [metadata, setMetadata] = useState<any | null>(null);
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const handleOnClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    /* Prevent form from submitting by default */
    e.preventDefault();

    /* If file is not selected, then show alert message */
    if (!inputFileRef.current?.files?.length) {
      alert("Please, select file you want to upload");
      return;
    }

    setIsLoading(true);

    /* Add files to FormData */
    const formData = new FormData();
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append("file", file);
    });

    formData.append("name", name);
    formData.append("description", description);

    /* Send request to our api route */
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const body = (await response.json()) as {
      status: "ok" | "fail";
      metadata: any;
    };

    console.log(body.metadata);
    setMetadata(body.metadata);

    if (body.status === "ok") {
      inputFileRef.current.value = "";
      // Do some stuff on successfully upload
    } else {
      // Do some stuff on error
    }

    setIsLoading(false);
  };

  return (
    <form method="post" action="/api/ipfs" encType="multipart/form-data">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="file" name="myfile" ref={inputFileRef} multiple />
      </div>
      <div>
        <input
          type="submit"
          value="Upload"
          disabled={isLoading}
          onClick={handleOnClick}
        />
        {isLoading && ` Wait, please...`}
      </div>
      <div>
        {metadata && (
          <div>
            <div>URI:{metadata.ipnft}</div>
            <div>Link: {metadata.url}</div>
          </div>
        )}
      </div>
    </form>
  );
};

export default Upload;
