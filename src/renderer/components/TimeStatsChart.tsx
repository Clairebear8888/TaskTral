import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { TimeEntry } from '../data/timeData';

type TimeStatsChartProps = {
  data: TimeEntry[];
  viewType: 'hourly' | 'daily';
};

export const TimeStatsChart: React.FC<TimeStatsChartProps> = ({ data, viewType }) => {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(timestamp) => {
          const date = new Date(timestamp);
          if (viewType === 'daily') {
            return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
          }
          return `${date.getHours()}:00`;
        }}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="work" stackId="a" fill="#8884d8" />
      <Bar dataKey="life" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
}; 