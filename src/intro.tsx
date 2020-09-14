import * as React from "react";

interface Props {
  onComplete: () => void;
}

export default function Intro(props: Props) {
  return (
    <div>
      <h1>Welcome to Textre!</h1>
      <p>
        Textre (pronounced texture) is a tool for extracting time series data
        from raw text files, and visualizing it on a graph. I built it to help
        me debug audio video call logs - but feel free to use it for whatever.
      </p>
      <h3>Getting Started</h3>
      <ul>
        <li>
          <p>
            First, you'll be asked to select a{" "}
            <span style={{ fontWeight: "bold" }}>source</span> - sources are
            just raw text files containing the content you want to select and
            visualize.
          </p>
        </li>
        <li>
          <p>
            Then you'll define some{" "}
            <span style={{ fontWeight: "bold" }}>regex</span> - regex tells us
            how to understand your content.
          </p>
        </li>
        <li>
          <p>
            That's it! You'll be presented with{" "}
            <span style={{ fontWeight: "bold" }}>the chart</span> - the chart is
            the main view in this app, it shows all your time series data and
            lets you interact with it.
          </p>
        </li>
        <li>
          <button onClick={() => props.onComplete()}>Begin!</button>
        </li>
      </ul>
    </div>
  );
}
