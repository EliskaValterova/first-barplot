import { useMemo } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const margin = { top: 20, right: 20, bottom: 40, left: 110 };
  const width = 800;
  const height = data.length * 35 + margin.top + margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.students)])
      .range([0, innerWidth]);
  }, [data, innerWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, innerHeight])
      .padding(0.2);
  }, [data, innerHeight]);

  return (
    <div className="chart-container">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((d) => (
            <g key={d.country} className="bar-group">
              <rect
                y={yScale(d.country)}
                width={xScale(d.students)}
                height={yScale.bandwidth()}
                className="bar"
              />
              <text
                x={-10}
                y={yScale(d.country) + yScale.bandwidth() / 2}
                textAnchor="end"
                alignmentBaseline="middle"
                className="country-label"
              >
                {d.country}
              </text>
              <text
                x={xScale(d.students) + 5}
                y={yScale(d.country) + yScale.bandwidth() / 2}
                alignmentBaseline="middle"
                className="value-label"
              >
                {d.students}
              </text>
            </g>
          ))}
          <line y2={innerHeight} className="axis-line" />
        </g>
      </svg>
    </div>
  );
};

export default BarChart;
