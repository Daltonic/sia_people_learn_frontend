import React from "react";
import {
 LineChart,
 Tooltip,
 Line,
 CartesianGrid,
 XAxis,
 YAxis,
 ResponsiveContainer,
} from "recharts";

type DataType = {
 name: string;
 value: number;
};

const data: DataType[] = [
 { name: "Jan", value: 148 },
 { name: "Feb", value: 100 },
 { name: "Marc", value: 205 },
 { name: "April", value: 110 },
 { name: "May", value: 165 },
 { name: "Jun", value: 145 },
 { name: "July", value: 180 },
 { name: "Agust", value: 156 },
 { name: "Sept", value: 148 },
 { name: "Oct", value: 220 },
 { name: "Now", value: 180 },
 { name: "Dec", value: 245 },
];

const Charts: React.FC = () => {
 const chart = (interval: string | number) => (
    <ResponsiveContainer height={250} width="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="" />
      <XAxis tick={{ fontSize: 12 }} dataKey="name" interval={typeof interval === 'number' || typeof interval === 'string' && !isNaN(Number(interval)) ? Number(interval) : undefined} />
      <YAxis
        tick={{ fontSize: 12 }}
        domain={[0, 300]}
        tickCount={7}
        interval={typeof interval === 'number' || typeof interval === 'string' && !isNaN(Number(interval)) ? Number(interval) : undefined}
      />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        strokeWidth={2}
        stroke="#C5165D"
        fill="#C5165D"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>
 );

 return <>{chart("preserveEnd")}</>;
};

export default Charts;
