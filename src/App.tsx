import "./App.css";
import { PasteAndCopy } from "./CopyPasteText";
import { AssignAsdf } from "./AssignAsdf";

declare global {
  interface Window {
    asdf: string;
  }
}

function App() {
  return (
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
      </div>
    </div>
  );
}

export default App;
