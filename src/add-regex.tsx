import * as React from "react";
import useLocalStorage from "react-use-localstorage";
import { RegexSource } from "./types";

interface Props {
  sources: RegexSource[];
  registerSource: (src: RegexSource) => void;
  onComplete: () => void;
}

export default function AddRegex(props: Props) {
  const textRef = React.useRef<HTMLInputElement>(null);
  const flagsRef = React.useRef<HTMLInputElement>(null);
  const markerRef = React.useRef<HTMLInputElement>(null);

  const [recentListRaw, setRecentListRaw] = useLocalStorage(
    "recent-regex",
    "[]"
  );

  const recentList = React.useMemo<RegexSource[]>(() => {
    return JSON.parse(recentListRaw);
  }, [recentListRaw]);

  const handleDone = React.useCallback(
    (textEl: HTMLInputElement | null) => {
      if (!textEl || !flagsRef.current || !markerRef.current) {
        return;
      }

      const textContent = textEl.getAttribute("data-regex") || textEl.value;
      const flagContent =
        textEl.getAttribute("data-flags") || flagsRef.current.value;
      let markerFlag =
        textEl.getAttribute("data-marker") || markerRef.current.checked;

      if (typeof markerFlag === "string") {
        markerFlag = markerFlag === "true";
      }

      try {
        // ensure it isn't garbage
        new RegExp(textContent, flagContent);
      } catch (e) {
        // TODO(bengreenier): tell em it's bad re
        return;
      }

      const src = {
        regex: textContent,
        flags: flagContent,
        marker: markerFlag
      };
      console.log(src);
      props.registerSource(src);

      if (
        recentList.find(
          (e) =>
            e.regex === src.regex &&
            e.flags === src.flags &&
            e.marker === src.marker
        ) === undefined
      ) {
        setRecentListRaw(JSON.stringify(recentList.concat([src])));
      }

      props.onComplete();
    },
    [props, recentList, setRecentListRaw]
  );

  return (
    <div>
      <h2>Add a regex</h2>
      <input ref={textRef} type="text" placeholder="regex" />
      <input ref={flagsRef} type="text" placeholder="flags" defaultValue="i" />
      <p style={{ display: "inline" }}>Is Marker: </p>
      <input ref={markerRef} type="checkbox" />
      <br />
      <button onClick={() => handleDone(textRef.current)}>Add</button>
      <button onClick={() => props.onComplete()}>Close</button>
      <h3>Current regexes</h3>
      {props.sources.map((re, i) => {
        return (
          <p key={re.regex + re.marker}>
            <span style={{ fontWeight: "bold" }}>{i}</span>
            {" - "}
            {re.regex}
          </p>
        );
      })}
      <h3>Recent regexes</h3>
      {recentList.map((entry: RegexSource) => (
        <input
          data-regex={entry.regex}
          data-flags={entry.flags}
          data-marker={entry.marker}
          key={entry.regex + entry.flags + entry.marker}
          type="text"
          readOnly
          value={
            "/" +
            entry.regex +
            "/" +
            entry.flags +
            " (isMarker: " +
            entry.marker +
            ")"
          }
          style={{ width: "100%" }}
          onClick={(ev) => handleDone(ev.currentTarget)}
        />
      ))}
      <h3>Requirements/Tips</h3>
      <ul>
        <li>
          <p>
            <span style={{ fontWeight: "bold" }}>time</span>
            {", and "}
            <span style={{ fontWeight: "bold" }}>plot</span> are required{" "}
            <a
              href="https://javascript.info/regexp-groups#named-groups"
              target="_blank"
              rel="noopener noreferrer"
            >
              named capture groups
            </a>
            . They inform us how to find the time series data.
          </p>
        </li>
        <li>
          <p>
            <span style={{ fontWeight: "bold" }}>split</span> is an optional{" "}
            <a
              href="https://javascript.info/regexp-groups#named-groups"
              target="_blank"
              rel="noopener noreferrer"
            >
              named capture group
            </a>
            . It allows optional splitting of series by some identifier.
          </p>
        </li>
        <li>
          <p>
            All other matches are captured as metadata, and included in the
            hover tooltip for each data point.
          </p>
        </li>
        <li>
          <p>The named capture group syntax is as follows: </p>
          <pre>
            (?&lt;time&gt;)
            <br />
            (?&lt;plot&gt;)
            <br />
            (?&lt;split&gt;)
          </pre>
        </li>
        <li>
          <pre style={{ display: "inline" }}>\s(?&lt;time&gt;.+?)\s</pre>
          <p style={{ display: "inline" }}>
            is a named capture group to select{" "}
            <span style={{ fontWeight: "bold" }}>time</span> as all characters
            between two instances of whitespace.
          </p>
        </li>
      </ul>
    </div>
  );
}
