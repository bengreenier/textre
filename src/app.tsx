import * as React from "react";
import AddSource from "./add-source";
import AddRegex from "./add-regex";
import Graph from "./graph";
import Intro from "./intro";
import { DataSource, RegexSource } from "./types";

import "./styles.css";

export default function App() {
  const [isOOBE, setIsOOBE] = React.useState<boolean>(true);
  const [addSourceVisible, setAddSourceVisible] = React.useState<boolean>(true);
  const [addRegexVisible, setAddRegexVisible] = React.useState<boolean>(true);
  const [dataSources, setDataSources] = React.useState<DataSource[]>([]);
  const [regexes, setRegexes] = React.useState<RegexSource[]>([]);

  const addSources = React.useCallback(
    (srcs: { name: string; data: string }[]) => {
      setDataSources(dataSources.concat(srcs));
    },
    [dataSources]
  );

  const addRegex = React.useCallback(
    (src: RegexSource) => {
      setRegexes(regexes.concat([src]));
    },
    [regexes]
  );

  if (isOOBE) {
    return <Intro onComplete={() => setIsOOBE(false)} />;
  } else if (addSourceVisible) {
    return (
      <AddSource
        registerSources={addSources}
        onComplete={() => setAddSourceVisible(false)}
      />
    );
  } else if (addRegexVisible) {
    return (
      <AddRegex
        sources={regexes}
        registerSource={addRegex}
        onComplete={() => setAddRegexVisible(false)}
      />
    );
  } else {
    return (
      <>
        <div>
          <span>
            <button onClick={() => setAddSourceVisible(true)}>
              Add Source [{dataSources.length}]
            </button>
          </span>
          <span>
            <button onClick={() => setAddRegexVisible(true)}>
              Add Regex [{regexes.length}]
            </button>
          </span>
          <span>
            <button onClick={() => setRegexes([])}>Clear Regex</button>
          </span>
        </div>
        <Graph datasources={dataSources} regexes={regexes} delim={"\n"} />
      </>
    );
  }
}
