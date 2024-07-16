import { FC, ReactNode, useState } from "react";
import "./App.css";
import { getImageThumbnail } from "./thumbs";

declare global {
  interface Window {
    asdf: string;
  }
}

function App() {
  return (
    <>
      <div style={{ width: "100%", height: "90vh", margin: "3rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <PasteAndCopy
            name={"Localhost url"}
            convert={(s) =>
              s
                .replace("https://", "http://")
                .replace("dev.app.picme.com", "localhost:8940")
            }
          >
            <div>Replace 'localhost:8940' with 'dev.app.picme.com'</div>
          </PasteAndCopy>
          <PasteAndCopy
            name={"url encode"}
            convert={(s) => encodeURIComponent(s)}
          />
          <PasteAndCopy
            name={"url decode"}
            convert={(s) => decodeURIComponent(s)}
          />
          <AssignAsdf />

          <textarea
            style={{
              width: "100%",
              height: "200px",
            }}
          />

          <ShareButton />
        </div>
      </div>
    </>
  );
}

const PasteAndCopy: FC<{
  name: string;
  convert: (s: string) => string;
  children?: ReactNode;
}> = ({ name, convert, children }) => {
  const [value, setValue] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>{name}</p>
      <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <input
          value={value}
          style={{ fontSize: "1rem", padding: "4px" }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>

        <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
          <button
            disabled={!value}
            onClick={() => {
              const newUrl = convert(value);
              navigator.clipboard.writeText(newUrl);
            }}
          >
            Copy
          </button>
          <button onClick={() => setValue("")}>X</button>

          <button
            onClick={() => {
              setSettingsOpen(!settingsOpen);
            }}
          >
            Settings
          </button>
        </div>
      </div>
      <p
        style={{
          opacity: 0.8,
          fontSize: "0.8rem",
          overflowX: "clip",
          maxWidth: "400px",
        }}
      >
        {convert(value) || "¯\\_(ツ)_/¯"}
      </p>
      {settingsOpen && children}
    </div>
  );
};

const AssignAsdf = () => {
  const [val, setVal] = useState("");

  return (
    <div>
      <p>Assign 'asdf' to be:</p>
      <textarea
        value={val}
        style={{
          width: "100%",
          height: "200px",
        }}
        onChange={(e) => {
          const v = e.target.value;
          setVal(v);

          try {
            const r = JSON.parse(v);
            window.asdf = r;
          } catch {
            window.asdf = v;
          }
        }}
      />

      <button onClick={() => setVal("")}>X</button>
    </div>
  );
};

const ShareButton = () => {
  // const slide = new Image()
  const [file, setFile] = useState<File>();
  // slide.src = image

  const handleSharePhoto = async () => {
    console.log(file);
    const fileBlob = await getImageThumbnail(file!);

    // const fileName = id.slice(id.lastIndexOf("/") + 1);
    // const fileExt = id.slice(id.lastIndexOf(".") + 1);
    // const mimeType = convertExtToMime(fileExt);

    await navigator.share({
      files: [
        fileBlob,
        // new File([fileBlob], fileName, { type: slide.mimetype || mimeType }),
      ],
    });
  };

  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
      <button onClick={() => handleSharePhoto()} />
    </>
  );
};

export default App;
