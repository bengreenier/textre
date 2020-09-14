import * as React from "react";
import { Line } from "react-chartjs-2";
import { flatten } from "array-flatten";
import { DataSource, RegexSource, RegExpWithMarker } from "./types";
import { parseRegexResult } from "./util";

import "chartjs-plugin-downsample";

interface Props {
  datasources: DataSource[];
  regexes: RegexSource[];
  delim: string;
}

const colors = [
  "#0f6fc6",
  "#009dd9",
  "#0bd0d9",
  "#10cf9b",
  "#7cca62",
  "#a5c249",
  "#9999ff",
  "#993366",
  "#ffffcc",
  "#ccffff",
  "#660066",
  "#ff8080",
  "#0066cc",
  "#ccccff",
  "#000080",
  "#ff00ff",
  "#ffff00",
  "#0000ff",
  "#800080",
  "#800000",
  "#008080",
  "#0000ff",
  "#f8c000",
  "#f88600",
  "#f83500",
  "#8b723d",
  "#818b3d",
  "#586215",
];

export default function Graph(props: Props) {
  React.useEffect(() => {});
  const data = React.useMemo(() => {
    const inflatedRegexes = props.regexes.map((re) => {
      const rex = new RegExp(re.regex, re.flags) as RegExpWithMarker;
      rex._marker = re.marker || false;
      return rex;
    });

    return flatten(
      props.datasources.map((s, i) => {
        const relevantLines = s.data
          .split(props.delim)
          .filter((line) => inflatedRegexes.some((regex) => regex.test(line)));

        return inflatedRegexes.map((re, j) => {
          // a colorid is a unique 0-based int that we use to pic a unique color for the visual
          const colorId = i + j;
          const splits: { [key: string]: boolean } = {};
          let isMarker = false;
          const data = relevantLines
            .map((line) => {
              return parseRegexResult(re, line);
            })
            .map((chunk) => {
              if (!chunk) {
                // bad chunk, gtfo - parse failed
                return undefined;
              }

              // record that there's a split, if there is one
              if (chunk.split && !splits[chunk.split]) {
                splits[chunk.split] = true;
              }

              // if it's a marker, lets plot it @ zero
              if (chunk.marker === true) {
                chunk.y = "-1";
                isMarker = true;
              }

              // a single data point is a t, y pair
              return chunk;
            })
            // remove any "bad eggs"
            .filter((c) => c !== undefined);

          // there's no splits, but we can fake one to keep the upcoming logic cleaner
          if (Object.keys(splits).length === 0) {
            splits[""] = true;
          }

          return Object.keys(splits).map((split, k) => {
            // recalc a color id, factoring in the split offsets
            const splitColorId = colorId + k;

            return {
              label: `${s.name} [${j}] ${split}`,
              fill: false,
              showLine: isMarker === false,
              borderColor: colors[splitColorId],
              backgroundColor: colors[splitColorId],
              // is this a real split or nah (short-circuit)
              data:
                split === ""
                  ? data
                  : data.filter((d) => d && d.split && d.split === split),
            };
          });
        });
      })
    );
  }, [props]);

  // render the line graph
  return (
    <div style={{ position: "relative", maxHeight: "100vh" }}>
      <Line
        data={{ datasets: data }}
        options={{
          downsample: {
            onInit: false,
            restoreOriginalData: false,
            enabled: true,
            threshold: 250, // max number of points to display per dataset
          },
          animation: {
            duration: 0,
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem: any, data: any) {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                var meta =
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ].meta;

                if (label) {
                  label += ": ";
                }

                if (meta) {
                  label += JSON.stringify(meta) + ": ";
                }

                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label;
              },
            },
          },
          scales: {
            xAxes: [
              {
                type: "time",
                distribution: "series",
                offset: true,
                ticks: {
                  major: {
                    enabled: true,
                    fontStyle: "bold",
                  },
                  source: "data",
                  autoSkip: true,
                  autoSkipPadding: 75,
                  maxRotation: 0,
                  sampleSize: 100,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawBorder: false,
                },
                scaleLabel: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
