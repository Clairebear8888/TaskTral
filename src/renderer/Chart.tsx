import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
  { name: 'Category C', value: 200 },
  { name: 'Category D', value: 100 },
];

export function HorizontalBarChart(): React.ReactElement {
  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      {/* Add a Cartesian grid */}
      <CartesianGrid strokeDasharray="3 3" />

      {/* Set Y-axis as the categorical axis */}
      <YAxis type="category" dataKey="name" />

      {/* Set X-axis as the value axis */}
      <XAxis type="number" />

      {/* Add a tooltip */}
      <Tooltip />

      {/* Add the bar series */}
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}
