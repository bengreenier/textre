import * as React from "react";

interface Props {
  registerSource: (name: string, data: string) => void;
  onComplete: () => void;
}

export default function AddSource(props: Props) {
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

      const proms: Promise<void>[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        proms.push(
          file.text().then((data) => {
            console.log(data.length);
            props.registerSource(file.name, data);
          })
        );
      }

      Promise.all(proms).then(() => {
        if (buttonRef.current) {
          buttonRef.current.disabled = false;
          buttonRef.current.style.backgroundColor = "";
        }
      });
    },
    [props]
  );

  const handleDone = React.useCallback(() => {
    props.onComplete();
  }, [props]);

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
