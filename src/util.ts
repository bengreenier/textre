import { RegexResult, RegExpWithMarker } from "./types";

export const parseRegexResult = (
  rex: RegExpWithMarker,
  line: string
): RegexResult | undefined => {
  const re = rex.exec(line);

  // markers don't need plot!
  if (
    !re ||
    !re.groups ||
    !re.groups.time ||
    (!re.groups.plot && !rex._marker)
  ) {
    return undefined;
  }

  const { time, plot, split } = re.groups;
  const meta: string[] = [];

  for (let i = 1; i < re.length; i++) {
    // skip data that's in a named group
    if (
      typeof re[i] !== "undefined" &&
      (re[i] === time || re[i] === plot || re[i] === split)
    ) {
      continue;
    }

    meta.push(re[i]);
  }

  const res: RegexResult = {
    x: time,
    y: plot,
    split,
    marker: rex._marker || false,
    meta: meta.length > 0 ? meta : undefined
  };

  return res;
};
