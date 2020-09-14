export interface DataSource {
  name: string;
  data: string;
}

export interface RegexSource {
  regex: string;
  flags: string;
  marker?: boolean;
}

// shorthand for knowing what these will get downcast to by chartjs

type NumberLike = string;

export type RegExpWithMarker = RegExp & { _marker: boolean };

export interface RegexResult {
  x: Date;
  y: NumberLike;
  marker?: boolean;
  meta?: string[];
  split?: string;
}
