import { useLocalStorage } from "./CopyPasteText";

export const AssignAsdf = () => {
  const [val, setVal] = useLocalStorage("asdf");

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

      <button style={{ padding: "12px" }} onClick={() => setVal("")}>
        X
      </button>
    </div>
  );
};
