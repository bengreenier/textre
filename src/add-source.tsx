import * as React from "react";

interface Props {
  registerSources: (srcs: { name: string; data: string }[]) => void;
  onComplete: () => void;
}

export default function AddSource(props: Props) {
  const { registerSources, onComplete } = props;
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (buttonRef.current) {
        buttonRef.current.disabled = true;
        buttonRef.current.style.backgroundColor = "red";
      }

      const files = ev.target.files;
      if (files == null) {
        return;
      }

      const proms: Promise<{ name: string; data: string }>[] = [];

      const loadSource = async (fl: File) => {
        const data = await fl.text();
        return { name: fl.name, data };
      };

      for (let i = 0; i < files.length; i++) {
        proms.push(loadSource(files[i]));
      }

      Promise.all(proms).then((sources) => {
        registerSources(sources);

        if (buttonRef.current) {
          buttonRef.current.disabled = false;
          buttonRef.current.style.backgroundColor = "";
        }
      });
    },
    [registerSources]
  );

  const handleDone = React.useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <div>
      <h2>
        Add a source <small>Select your file(s)</small>
      </h2>
      <input type="file" multiple onChange={handleChange} accept=".txt"></input>
      <br />
      <button ref={buttonRef} onClick={handleDone}>
        Close
      </button>
    </div>
  );
}
