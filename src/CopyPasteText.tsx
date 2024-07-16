import { FC, ReactNode, useEffect, useState } from "react";

export function useLocalStorage(
  key: string,
  initValue?: string
): [s: string, setS: (s: string) => void] {
  const [s, setS] = useState<string>(initValue ?? "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    localStorage.setItem(key, s);
    setS(s);
  }, [s, key, loading]);

  useEffect(() => {
    if (!loading) return;
    const prev = window.localStorage.getItem(key) ?? "";
    if (prev !== "") {
      setS(prev);
    }
    setLoading(false);
  }, [key, loading]);

  return [s, setS];
}

export const PasteAndCopy: FC<{
  name: string;
  convert: (s: string) => string;
  children?: ReactNode;
}> = ({ name, convert, children }) => {
  const [value, setValue] = useLocalStorage(name);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>{name}</p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <button style={{ padding: "12px" }} onClick={() => setValue("")}>
          x
        </button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            value={value}
            style={{ fontSize: "1rem", padding: "4px", width: "500px" }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></input>

          <p
            style={{
              opacity: 0.8,
              fontSize: "0.8rem",
              overflowX: "clip",
            }}
          >
            {convert(value) || "¯\\_(ツ)_/¯"}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
          <button
            disabled={!value}
            style={{ padding: "12px" }}
            onClick={() => {
              const newUrl = convert(value);
              navigator.clipboard.writeText(newUrl);
            }}
          >
            Copy
          </button>

          <button
            style={{ padding: "12px" }}
            onClick={() => {
              setSettingsOpen(!settingsOpen);
            }}
          >
            Settings
          </button>
        </div>
      </div>
      {settingsOpen && children}
    </div>
  );
};
