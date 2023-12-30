import React from 'react';
import {
 Pie,
 Tooltip,
 Legend,
 PieChart,
 Cell,
 ResponsiveContainer,
} from "recharts";

interface DataType {
 name: string;
 value: number;
}

const data: DataType[] = [
 { name: "Direct", value: 400 },
 { name: "Referal", value: 300 },
 { name: "Organic", value: 300 },
];

const COLORS = ["#336CFB", "#336CFB", "#336CFB", "#336CFB"];

const PieChartComponent: React.FC = () => {
 return (
   <ResponsiveContainer width="100%" height={250}>
     <PieChart width={350} height={350}>
       <Pie
         dataKey="value"
         isAnimationActive={false}
         data={data}
         cx="50%"
         cy="50%"
         innerRadius={60}
         outerRadius={75}
         fill="#C5165D"
       />

       <Tooltip />
       <Legend />
     </PieChart>
   </ResponsiveContainer>
 );
};

export default PieChartComponent;
